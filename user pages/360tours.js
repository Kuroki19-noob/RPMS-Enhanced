

    const tourConfig = {
    default: {
        firstScene: "livingroom",
        sceneFadeDuration: 800
    },

    scenes: {
        livingroom: {
            title: "Living Room",
            type: "equirectangular",
            panorama: "../Assets/panorama/livingroom.jpg",
            hotSpots: [
                {
                    pitch: -8,
                    yaw: 45,
                    type: "scene",
                    text: "Kitchen",
                    sceneId: "kitchen"
                },
                {
                    pitch: -10,
                    yaw: 180,
                    type: "scene",
                    text: "Dining Area",
                    sceneId: "dining"
                },
                {
                    pitch: 0,
                    yaw: 218,
                    type: "scene",
                    text: "balcony",
                    sceneId: "balcony"
                },
                {
                    pitch: -10,
                    yaw: 125,
                    type: "scene",
                    text: "bed room 1",
                    sceneId: "bedroom1"
                },
                {
                    pitch: -10,
                    yaw: 95,
                    type: "scene",
                    text: "bathroom",
                    sceneId: "bathroom"
                },
                {
                    pitch: -10,
                    yaw: 75,
                    type: "scene",
                    text: "bed room 2",
                    sceneId: "bedroom2"
                }
            ]
        },

        kitchen: {
            title: "Kitchen",
            type: "equirectangular",
            panorama: "../Assets/panorama/kitchen.jpg",
            hotSpots: [
                {
                    pitch: -15,
                    yaw: 255,
                    type: "scene",
                    text: "Back to Living Room",
                    sceneId: "livingroom"
                }
                
            ]
        },

        bedroom1: {
            title: "Bedroom 1",
            type: "equirectangular",
            panorama: "../Assets/panorama/bed room 1.jpg",
            hotSpots: [
                {
                    pitch: 0,
                    yaw: 265,   
                    type: "scene",
                    text: "Back to Living Room",
                    sceneId: "livingroom"
                }
                
            ]
        },

        bedroom2: {
            title: "Bedroom 2",
            type: "equirectangular",
            panorama: "../Assets/panorama/bed room 2.jpg",
            hotSpots: [
                {
                    pitch: 0,
                    yaw: 280,
                    type: "scene",
                    text: "Back to Living Room",
                    sceneId: "livingroom"
                },
               
            ]
        },

        bathroom: {
            title: "Bathroom",
            type: "equirectangular",
            panorama: "../Assets/panorama/bathroom.jpg",
            hotSpots: [
                {
                    pitch: -5,
                    yaw: 267,
                    type: "scene",
                    text: "Back to Living Room",
                    sceneId: "livingroom"
                }
            ]
        },
        

        balcony: {
            title: "Balcony",
            type: "equirectangular",
            panorama: "../Assets/panorama/balcony.jpg",
            hotSpots: [
                {
                    pitch: 0,
                    yaw: 240,
                    type: "scene",
                    text: "Back to Dining Room",
                    sceneId: "dining"
                }
            ]
        },

        dining: {
            title: "Dining Room",
            type: "equirectangular",
            panorama: "../Assets/panorama/dining.jpg",
            hotSpots: [
                {
                    pitch: 0,
                    yaw: -90,
                    type: "scene",
                    text: "Return to Living Room",
                    sceneId: "livingroom"
                },
                {
                    pitch: 0,
                    yaw: 90,
                    type: "scene",
                    text: "Go to Balcony",
                    sceneId: "balcony"
                }
            ]
        }
    }
};
    
const viewerStatus = document.getElementById("viewerStatus");

let viewer = null;

function updateActiveButton(sceneId) {
    document.querySelectorAll(".tour-controls button").forEach(button => {
        const isActive = button.dataset.scene === sceneId;

        button.classList.toggle("active", isActive);
    });
}

function initializeTour() {
    if (!viewerStatus || !document.getElementById("apartment360")) {
        console.error("The viewer HTML elements are missing.");
        return;
    }

    if (!window.pannellum) {
        viewerStatus.textContent =
            "Pannellum did not load. Check your internet connection.";
        console.error("Pannellum library is unavailable.");
        return;
    }

    try {
        viewer = pannellum.viewer("apartment360", tourConfig);

        viewer.on("scenechange", function (sceneId) {
            const scene = tourConfig.scenes[sceneId];

            viewerStatus.textContent = scene
                ? "Currently exploring: " + scene.title
                : "Exploring apartment panorama.";

            updateActiveButton(sceneId);
        });

        viewer.on("load", function () {
            const sceneId = viewer.getScene();

            updateActiveButton(sceneId);

            const scene = tourConfig.scenes[sceneId];

            viewerStatus.textContent = scene
                ? "Currently exploring: " + scene.title
                : "360° panorama loaded successfully.";
        });

        viewer.on("error", function (error) {
            viewerStatus.textContent =
                "Unable to load a panorama. Check your image paths and files.";

            console.error("Pannellum error:", error);
        });

    } catch (error) {
        viewerStatus.textContent =
            "Unable to initialize the 360° tour.";

        console.error("Tour initialization error:", error);
    }
}

function goToRoom(roomId) {
    if (!viewer) {
        console.error("The 360° viewer has not initialized yet.");
        return;
    }

    if (!tourConfig.scenes[roomId]) {
        console.error("Room not found:", roomId);
        return;
    }

    viewer.loadScene(roomId);
}

// Run after the HTML document is ready.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeTour);
} else {
    initializeTour();
}
