document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const shimmerContainer = document.getElementById('shimmerContainer');
    const resultContainer = document.getElementById('resultContainer');
    const errorContainer = document.getElementById('errorContainer');

    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    async function handleSearch() {
        const handle = searchInput.value.trim();
        
        if (!handle) {
            showError("Please enter a valid Codeforces handle.");
            return;
        }

        // Search Flow: Before every new search, clear old results and errors, show the shimmer loader
        errorContainer.classList.add('hidden');
        resultContainer.classList.add('hidden');
        resultContainer.innerHTML = '';
        shimmerContainer.classList.remove('hidden');

        try {
            // Fetch User Info, Rating History, and All Submissions concurrently
            const [userInfo, bestRankData, problemsData] = await Promise.all([
                fetchUserInfo(handle),
                fetchBestContestRank(handle),
                fetchAllProblems(handle)
            ]);

            // Hide shimmer loader and render new result
            shimmerContainer.classList.add('hidden');
            renderDashboard(userInfo, bestRankData, problemsData);
        } catch (error) {
            showError(error.message || "Failed to fetch data. Please try again later.");
        }
    }

    function showError(message) {
        errorContainer.textContent = message;
        errorContainer.classList.remove('hidden');
        shimmerContainer.classList.add('hidden');
        resultContainer.classList.add('hidden');
    }

    async function fetchUserInfo(handle) {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const data = await response.json();
        if (data.status !== "OK") throw new Error(data.comment || "User not found");
        return data.result[0];
    }

    async function fetchBestContestRank(handle) {
        const response = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
        const data = await response.json();
        if (data.status !== "OK") throw new Error("Failed to fetch rating history");
        
        if (data.result.length === 0) return null;

        let bestRank = data.result[0];
        for (let i = 1; i < data.result.length; i++) {
            if (data.result[i].rank < bestRank.rank) {
                bestRank = data.result[i];
            }
        }
        return bestRank;
    }

    async function fetchAllProblems(handle) {
        const response = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);
        const data = await response.json();
        if (data.status !== "OK") throw new Error("Failed to fetch problems");

        const uniqueSet = new Set();
        const solvedProblems = [];
        let lastSolvedProblem = null;

        // Codeforces status API returns the latest submissions first.
        data.result.forEach(item => {
            if (item.verdict === "OK") {
                // Track the very first "OK" submission as the Last Solved Problem
                if (!lastSolvedProblem) {
                    lastSolvedProblem = item.problem;
                }

                const uniqueKey = item.problem.contestId + String(item.problem.index);
                if (!uniqueSet.has(uniqueKey)) {
                    uniqueSet.add(uniqueKey);
                    solvedProblems.push(item);
                }
            }
        });

        const tagMap = new Map();
        solvedProblems.forEach(item => {
            if (item.problem.tags) {
                item.problem.tags.forEach(tag => {
                    tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
                });
            }
        });

        return {
            lastSolvedProblem: lastSolvedProblem,
            totalSolved: solvedProblems.length,
            tags: tagMap
        };
    }

    function renderDashboard(user, bestRank, problemsData) {
        let bestRankHtml = bestRank 
            ? `<p><strong>Best Rank:</strong> ${bestRank.rank} in ${bestRank.contestName}</p>`
            : ``;

        let lastProblemHtml = problemsData.lastSolvedProblem
            ? `<a href="https://codeforces.com/problemset/problem/${problemsData.lastSolvedProblem.contestId}/${problemsData.lastSolvedProblem.index}" target="_blank"><strong>Last Problem Solved:</strong> ${problemsData.lastSolvedProblem.index}. ${problemsData.lastSolvedProblem.name} Tags : ${problemsData.lastSolvedProblem.tags ? problemsData.lastSolvedProblem.tags.join(' , ') : ''} </a>`
            : ``;

        let tagsHtml = '';
        problemsData.tags.forEach((count, tag) => {
            tagsHtml += `<div>${tag}: ${count}</div>`;
        });

        // Handle possible undefined values gracefully
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
        const location = [user.city, user.country].filter(Boolean).join(', ');

        resultContainer.innerHTML = `
            <div class="user-details">
                <img src="${user.titlePhoto || ''}" alt="User Image" class="user-image"/>
                <div class="details">
                    <p><strong>Name:</strong> ${fullName}</p>
                    <p><strong>From:</strong> ${location}</p>
                    <p><strong>College Name:</strong> ${user.organization || 'None'}</p>
                    <p><strong>Current Rating:</strong> ${user.rating || 'Unrated'} ${user.rank || ''}</p>
                    <p><strong>Maximum Rating:</strong> ${user.maxRating || 'Unrated'} ${user.maxRank || ''}</p>
                    <p><strong>Total Friends:</strong> ${user.friendOfCount || 0}</p>
                    ${bestRankHtml}
                    ${lastProblemHtml}
                    <p><strong>Total Problem Solved:</strong> ${problemsData.totalSolved}</p>
                    <p><strong>Problem With Tag Wise:</strong></p>
                    ${tagsHtml}
                </div>
            </div>
        `;

        resultContainer.classList.remove('hidden');
    }
});
