/* ==========================================================================
   [수정 완료] 평지/하이킹 이원화 노선 레이어 스위칭 가상 데이터 로직
   ========================================================================== */
const STORAGE_KEY = "yongcheon_health_state";

const mock_db = {
    TrackingView: {
        metrics: {
            distance_km: 8.4,
            target_km: 12.0,
            duration: "02:45:12",
            calories_burned: 420,
            current_elevation_m: 240,
            pace_min_per_km: 14.5
        },
        chart_data: {
            elevation_profile: [180, 220, 260, 310, 360, 420, 470, 480]
        }
    }
};

function safeLoadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        console.warn("로컬 저장 상태를 불러오지 못했습니다.", error);
        return null;
    }
}

function applySavedState() {
    const saved = safeLoadState();
    if (!saved || !saved.TrackingView) return;

    const savedMetrics = saved.TrackingView.metrics || {};
    const savedChart = saved.TrackingView.chart_data || {};

    mock_db.TrackingView.metrics = {
        ...mock_db.TrackingView.metrics,
        ...savedMetrics
    };

    mock_db.TrackingView.chart_data = {
        ...mock_db.TrackingView.chart_data,
        ...savedChart
    };
}

function updateCourseUI() {
    const metrics = mock_db.TrackingView.metrics || {};
    const chartData = mock_db.TrackingView.chart_data || {};
    const profile = Array.isArray(chartData.elevation_profile) ? chartData.elevation_profile : [];

    const displayDistance = document.getElementById("display-distance");
    const displayTarget = document.getElementById("display-target");
    const displayDuration = document.getElementById("display-duration");
    const displayCalories = document.getElementById("display-calories");
    const displayElevation = document.getElementById("display-elevation");
    const displayPace = document.getElementById("display-pace");
    const chartVisual = document.getElementById("health-chart-visual");

    if (displayDistance) displayDistance.textContent = Number(metrics.distance_km ?? 0).toFixed(1);
    if (displayTarget) displayTarget.textContent = Number(metrics.target_km ?? 0).toFixed(1);
    if (displayDuration) displayDuration.textContent = metrics.duration || "00:00:00";
    if (displayCalories) displayCalories.textContent = `${Number(metrics.calories_burned ?? 0)} kcal`;
    if (displayElevation) displayElevation.textContent = `${Number(metrics.current_elevation_m ?? 0)} m`;
    if (displayPace) displayPace.textContent = `${Number(metrics.pace_min_per_km ?? 0).toFixed(1)} 분/km`;

    if (chartVisual) {
        if (profile.length === 0) {
            chartVisual.innerHTML = "";
            return;
        }

        const maxValue = Math.max(...profile, 1);
        const barMarkup = profile
            .map((value) => {
                const height = Math.max(12, (value / maxValue) * 100);
                return `<span class="chart-bar" style="height: ${height}%"></span>`;
            })
            .join("");

        chartVisual.innerHTML = barMarkup;
    }
}

function switchTab(tabName) {
    const tabs = document.querySelectorAll(".tab-content");
    const navButtons = document.querySelectorAll(".tab-button");

    tabs.forEach((tab) => {
        const isActive = tab.id === `content-${tabName}`;
        tab.classList.toggle("active", isActive);
    });

    navButtons.forEach((button) => {
        const isActive = button.id === `tab-btn-${tabName}`;
        button.classList.toggle("active", isActive);
    });
}

function toggleHealthRoute(type) {
    const btnPlain = document.getElementById("btn-plain");
    const btnHiking = document.getElementById("btn-hiking");
    const chartText = document.getElementById("chart-status-text");
    const insightText = document.getElementById("insight-text");
    const ring = document.querySelector(".activity-ring-mock");

    if (type === "PLAIN") {
        if (btnPlain) btnPlain.classList.add("active-plain");
        if (btnHiking) btnHiking.classList.remove("active-hiking");
        if (ring) ring.classList.remove("hiking-mode");

        if (chartText) chartText.innerText = "수변 데크길 레이어 출력 중 (평지 경사도 0%)";
        if (insightText) insightText.innerText = "지난주 평균 페이스보다 안정적입니다. 무릎 부담이 적고 지형 변화가 거의 없는 쾌적한 데크길 구간입니다.";

        mock_db.TrackingView.metrics.current_elevation_m = 120;
        mock_db.TrackingView.metrics.calories_burned = 210;
        mock_db.TrackingView.metrics.distance_km = 8.4;
        mock_db.TrackingView.metrics.target_km = 12.0;
        mock_db.TrackingView.metrics.duration = "02:45:12";
        mock_db.TrackingView.metrics.pace_min_per_km = 14.5;
        mock_db.TrackingView.chart_data.elevation_profile = [118, 120, 121, 123, 124, 122, 120, 119];
    } else {
        if (btnPlain) btnPlain.classList.remove("active-plain");
        if (btnHiking) btnHiking.classList.add("active-hiking");
        if (ring) ring.classList.add("hiking-mode");

        if (chartText) chartText.innerText = "두타산 중심봉 종주 레이어 출력 중 (산악 경사도 15%+)";
        if (insightText) insightText.innerText = "사용자의 지난주 평균 트레킹 페이스보다 15% 빠르게 걷고 있습니다. 상하 고도 진폭이 커졌으니 발목 및 무릎 부상에 유의하세요.";

        mock_db.TrackingView.metrics.current_elevation_m = 480;
        mock_db.TrackingView.metrics.calories_burned = 680;
        mock_db.TrackingView.metrics.distance_km = 10.8;
        mock_db.TrackingView.metrics.target_km = 14.0;
        mock_db.TrackingView.metrics.duration = "03:10:44";
        mock_db.TrackingView.metrics.pace_min_per_km = 12.8;
        mock_db.TrackingView.chart_data.elevation_profile = [180, 220, 260, 310, 360, 420, 470, 480];
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mock_db));
    } catch (error) {
        console.warn("로컬 저장에 실패했습니다.", error);
    }

    updateCourseUI();
}

function initApp() {
    applySavedState();
    updateCourseUI();
    toggleHealthRoute("PLAIN");
}

document.addEventListener("DOMContentLoaded", initApp);