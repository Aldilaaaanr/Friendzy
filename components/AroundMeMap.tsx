import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

interface MapUser {
    id: number;
    name: string;
    lat: number;
    lng: number;
    avatar: string;
    interests: string[];
}

interface LocationCoords {
    latitude: number;
    longitude: number;
}

interface AroundMeMapProps {
    users: MapUser[];
    userLocation?: LocationCoords | null;
}

export default function AroundMeMap({ users, userLocation }: AroundMeMapProps) {
    const webViewRef = useRef<WebView>(null);
    const usersJson = JSON.stringify(users);

    // Update peta saat lokasi pengguna berubah (tombol ditekan)
    useEffect(() => {
        if (userLocation && webViewRef.current) {
            const { latitude, longitude } = userLocation;

            const script = `
                (function() {
                    var lat = ${latitude};
                    var lng = ${longitude};
                    
                    // 1. Hapus elemen UI lama (marker user, circle, lines)
                    if (window.userMarker) {
                        map.removeLayer(window.userMarker);
                        map.removeLayer(window.userCircle);
                    }
                    if (window.linesLayer) {
                        window.linesLayer.clearLayers();
                    }

                    // 2. Buat Marker User Baru
                    window.userMarker = L.marker([lat, lng], {
                        icon: L.divIcon({
                            className: 'my-location',
                            html: '<div style="width: 16px; height: 16px; background-color: #4B164C; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>',
                            iconSize: [20, 20]
                        })
                    }).addTo(map).bindPopup("You are here").openPopup();

                    // 3. Buat Lingkaran Radius
                    window.userCircle = L.circle([lat, lng], 500, { 
                        color: '#4B164C', 
                        fillOpacity: 0.05, 
                        weight: 1 
                    }).addTo(map);

                    // 4. GAMBAR GARIS PUTUS-PUTUS ke setiap user
                    // users variable tersedia secara global dari inisialisasi awal
                    if (typeof users !== 'undefined') {
                        users.forEach(function(user) {
                            var line = L.polyline([[lat, lng], [user.lat, user.lng]], {
                                color: '#DD88CF',   // Warna Secondary (Pink/Ungu Muda)
                                weight: 2,          // Ketebalan garis
                                opacity: 0.6,       // Transparansi
                                dashArray: '10, 10', // Pola putus-putus (10px garis, 10px spasi)
                                lineCap: 'round'
                            });
                            window.linesLayer.addLayer(line);
                        });
                    }

                    // 5. Fokus Peta ke area yang mencakup User + Semua marker lain
                    // Agar semua garis terlihat
                    var group = new L.featureGroup([window.userMarker]);
                    if (typeof users !== 'undefined') {
                         users.forEach(u => group.addLayer(L.marker([u.lat, u.lng])));
                    }
                    map.fitBounds(group.getBounds().pad(0.2));

                })();
            `;
            webViewRef.current.injectJavaScript(script);
        }
    }, [userLocation]);

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
            body { margin: 0; padding: 0; }
            #map { width: 100%; height: 100vh; }
            
            .custom-marker-container {
                width: 50px; height: 50px; border-radius: 50%;
                border: 3px solid #DA8EE7; background-color: white;
                overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.3);
                display: flex; justify-content: center; align-items: center;
            }
            .custom-marker-img { width: 100%; height: 100%; object-fit: cover; }
            .marker-label {
                background-color: #4A144B; color: white; padding: 2px 8px;
                border-radius: 10px; font-family: Arial, sans-serif;
                font-size: 12px; font-weight: bold; text-align: center;
                margin-top: -10px; position: relative; z-index: 1000;
                white-space: nowrap; border: 1px solid #DA8EE7;
            }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            // Inisialisasi Peta
            var map = L.map('map', { zoomControl: false }).setView([51.505, -0.09], 13);
            
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);

            // Inisialisasi Layer Group untuk Garis
            window.linesLayer = L.layerGroup().addTo(map);
            window.userMarker = null;
            window.userCircle = null;

            // Render Marker Users Sekitar
            var users = ${usersJson};
            
            users.forEach(function(user) {
                var customIcon = L.divIcon({
                    className: 'custom-div-icon',
                    html: \`
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <div class="custom-marker-container">
                                <img src="\${user.avatar}" class="custom-marker-img" />
                            </div>
                            <div class="marker-label">\${user.name}</div>
                        </div>
                    \`,
                    iconSize: [50, 70], iconAnchor: [25, 50]
                });
                L.marker([user.lat, user.lng], {icon: customIcon})
                 .addTo(map)
                 .bindPopup("<b>" + user.name + "</b><br>" + user.interests.join(", "));
            });

            // Fit bounds awal jika ada user
            if(users.length > 0) {
                 var group = new L.featureGroup(users.map(u => L.marker([u.lat, u.lng])));
                 map.fitBounds(group.getBounds().pad(0.2));
            }
        </script>
    </body>
    </html>
    `;

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef}
                originWhitelist={["*"]}
                source={{ html: htmlContent }}
                style={styles.map}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 500,
        width: "100%",
        overflow: "hidden",
        marginTop: 10,
        marginBottom: 75,
        backgroundColor: "#f0f0f0",
        position: "relative",
    },
    map: { flex: 1 },
});
