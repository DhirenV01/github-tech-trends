const comparisonCache = {};
const comparisonPromises = {};

async function fetchLocalData(path) {
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error('Failed to load data');
        return await res.json();
    } catch (err) {
        console.warn('Data fetch failed:', err);
        return [];
    }
}

export async function getRepoCounts(range = 'weekly') {
    const byTopic = await getRepoCountsByTopic(range);
    if (!byTopic || !byTopic.length) return [];
    return byTopic.map(entry => {
        const counts = entry.counts || {};
        const total = Object.values(counts).reduce((s, v) => s + (Number(v) || 0), 0);
        return { date: entry.date, count: total };
    });
}

export async function getRepoCountsByTopic(range = 'weekly') {
    return fetchLocalData(`data/repo-counts-${range}.json`);
}

export async function getLanguagesTimeseries(range = 'weekly') {
    return fetchLocalData(`data/primary-languages-${range}.json`);
}

export async function getRepoList(range = 'weekly') {
    const data = await getRepoComparison(range);
    if (!data) return [];

    return Object.entries(data).map(([id, repoData]) => {
        const history = repoData.history || [];
        const latest = history.length > 0 
            ? history.reduce((a, b) => (a.date > b.date ? a : b)) 
            : {};

        return {
            id: id,
            name: repoData.name || id,
            stars: latest.stars || 0,
            forks: latest.forks || 0,
            open_issues: latest.open_issues || 0,
            size: latest.size || 0
        };
    });
}

export async function getRepoComparison(range = 'weekly') {
    if (comparisonCache[range]) {
        return comparisonCache[range];
    }

    if (comparisonPromises[range]) {
        return comparisonPromises[range];
    }

    const promise = fetchLocalData(`data/repo-comparison-${range}.json`)
        .then(data => {
            if (data) comparisonCache[range] = data;
            delete comparisonPromises[range];
            return data;
        });

    comparisonPromises[range] = promise;
    return promise;
}