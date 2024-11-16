import { Card } from "@/components/ui/card";
import React, { useEffect } from "react";
import initialize from "@/engine/normal-vpl/main";
import initializeHeadless from "@/engine/headless-vpl/main";

function page() {
  useEffect(() => {
    const initVPL = async () => {
      try {
        initialize();
      } catch (error) {
        console.error("VPLの初期化に失敗しました:", error);
      }
    };

    initVPL();

    const initHeadlessVPL = async () => {
      try {
        initializeHeadless();
      } catch (error) {
        console.error("VPLの初期化に失敗しました:", error);
      }
    };

    initHeadlessVPL();
  }, []);

  return (
    <>
      <main className="h-screen bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <div className="p-4 flex gap-4 h-full w-full">
          <StageNormal />
          <StageHeadless />
        </div>
      </main>
    </>
  );
}

export default page;

function StageNormal() {
  return (
    <Card className="w-full h-full">
      <svg id="workspace" className="w-full h-full">
        <g id="block1" className="block">
          <rect
            width="200"
            height="60"
            rx="10"
            ry="10"
            fill="#4CAF50"
            stroke="#2E7D32"
          />
          <circle cx="20" cy="60" r="10" fill="#FFFFFF" stroke="#2E7D32" />
          <circle cx="20" cy="0" r="10" fill="#FFFFFF" stroke="#2E7D32" />
          <text
            x="20"
            y="35"
            fill="white"
            font-family="Arial"
            className="select-none"
          >
            最初のブロック
          </text>
        </g>
        <g id="block2" className="block">
          <rect
            width="200"
            height="60"
            rx="10"
            ry="10"
            fill="#2196F3"
            stroke="#1565C0"
          />
          <circle cx="20" cy="60" r="10" fill="#FFFFFF" stroke="#1565C0" />
          <circle cx="20" cy="0" r="10" fill="#FFFFFF" stroke="#1565C0" />
          <text
            x="20"
            y="35"
            fill="white"
            font-family="Arial"
            className="select-none"
          >
            2番目のブロック
          </text>
        </g>
        <g id="block3" className="block">
          <rect
            width="220"
            height="60"
            rx="10"
            ry="10"
            fill="#2196F3"
            stroke="#1565C0"
          />
          <circle cx="20" cy="60" r="10" fill="#FFFFFF" stroke="#1565C0" />
          <circle cx="20" cy="0" r="10" fill="#FFFFFF" stroke="#1565C0" />
          <text
            x="20"
            y="38"
            fill="white"
            font-family="Arial"
            className="select-none font-bold text-2xl"
          >
            sigmoid
          </text>
          <rect
            x="120"
            y="8"
            width="80"
            height="45"
            rx="20"
            ry="20"
            fill="#fff"
            stroke="#1565C0"
          />

          <foreignObject x="120" y="8" width="80" height="45">
            <div className="flex items-center justify-center h-full flex-col px-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue="0"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  const point = document.querySelector("#sigmoid-point");
                  if (point) {
                    const x = value * 160 + 270;
                    const normalizedX = (x - 270 - 80) / 10;
                    const y = 71 - 90 / (1 + Math.exp(-normalizedX));
                    point.setAttribute("cx", x.toString());
                    point.setAttribute("cy", y.toString());

                    const sigmoidResult = 1 / (1 + Math.exp(-normalizedX));
                    const resultText =
                      document.getElementById("sigmoid-result");
                    if (resultText) {
                      resultText.textContent = sigmoidResult.toFixed(4);
                    }
                  }
                }}
                className="w-full mx-2 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700"
              />
            </div>
          </foreignObject>

          {/* 右側にシグモイド関数のポップアップ */}
          <rect
            width="200"
            height="150"
            rx="10"
            ry="10"
            fill="#2196F3"
            stroke="#1565C0"
            x="250"
            y="-50"
          />
          <rect
            width="180"
            height="130"
            rx="10"
            ry="10"
            fill="white"
            x="260"
            y="-40"
          />
          <svg
            x="250"
            y="-50"
            width="200"
            height="150"
            viewBox="0 0 200 150"
            preserveAspectRatio="none"
          >
            {/* 方眼罫の追加 */}
            <defs>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="gray"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="200" height="150" fill="url(#grid)" />

            <path
              d={(() => {
                const points = [];
                for (let x = 0; x <= 160; x++) {
                  const normalizedX = (x - 80) / 10;
                  const y = 122 - 90 / (1 + Math.exp(-normalizedX));
                  points.push(`${x + 20},${y}`);
                }
                return `M ${points.join(" L ")}`;
              })()}
              stroke="blue"
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>

          {/* 点 */}
          <circle
            id="sigmoid-point"
            cx="270"
            cy="71"
            r="8"
            fill="white"
            stroke="gray"
            strokeWidth="2"
            style={{ filter: "drop-shadow(0 0 3px rgba(0, 0, 0, 0.5))" }}
          />

          <text
            id="sigmoid-result"
            x="370"
            y="35"
            fill="black"
            className="text-lg font-bold"
          >
            0.0000
          </text>
        </g>

        <g id="block4" className="block">
          <rect
            width="450"
            height="230"
            rx="10"
            ry="10"
            fill="#4CAF50"
            stroke="#2E7D32"
          />
          <circle cx="20" cy="230" r="10" fill="#FFFFFF" stroke="#2E7D32" />
          <circle cx="20" cy="0" r="10" fill="#FFFFFF" stroke="#2E7D32" />
          <text
            x="20"
            y="115"
            fill="white"
            font-family="Arial"
            className="select-none font-bold text-2xl"
          >
            dots
          </text>

          {/* 行列1 */}
          <rect
            width="110"
            height="200"
            rx="10"
            ry="10"
            y="15"
            x="100"
            fill="white"
          />
          {[0, 1].map((col) =>
            Array(4)
              .fill(0)
              .map((_, row) => (
                <foreignObject
                  key={`${row}-${col}`}
                  x={113 + col * 45}
                  y={27 + row * 45}
                  width="40"
                  height="40"
                >
                  <input
                    type="text"
                    defaultValue={Math.random().toFixed(1)}
                    style={{
                      textAlign: "center",
                      lineHeight: "40px",
                    }}
                    className="text-center rounded-lg border-2 border-black w-full h-full"
                  />
                </foreignObject>
              ))
          )}

          {/* 行列2 */}
          <rect
            width="200"
            height="110"
            rx="10"
            ry="10"
            y="60"
            x="230"
            fill="white"
          />
          {Array(2)
            .fill(0)
            .map((_, col) =>
              Array(4)
                .fill(0)
                .map((_, row) => (
                  <foreignObject
                    key={`${row}-${col}`}
                    x={240 + row * 45}
                    y={72 + col * 45}
                    width="40"
                    height="40"
                  >
                    <input
                      type="text"
                      defaultValue={Math.random().toFixed(1)}
                      style={{
                        textAlign: "center",
                        lineHeight: "40px",
                      }}
                      className="text-center rounded-lg border-2 border-black w-full h-full"
                    />
                  </foreignObject>
                ))
            )}
        </g>
      </svg>
    </Card>
  );
}

function StageHeadless() {
  return (
    <Card className="w-full h-full">
      <svg id="workspace2" className="w-full h-full">
        <g id="block1" className="block" transform="translate(100,100)">
          <rect
            width="200"
            height="60"
            rx="10"
            ry="10"
            fill="#4CAF50"
            stroke="#2E7D32"
          />
          <circle cx="20" cy="60" r="10" fill="#FFFFFF" stroke="#2E7D32" />
          <circle cx="20" cy="0" r="10" fill="#FFFFFF" stroke="#2E7D32" />
          <text
            x="20"
            y="35"
            fill="white"
            font-family="Arial"
            className="select-none"
          >
            最初のブロック
          </text>
        </g>
        <g id="block2" className="block" transform="translate(100,200)">
          <rect
            width="200"
            height="60"
            rx="10"
            ry="10"
            fill="#2196F3"
            stroke="#1565C0"
          />
          <text
            x="20"
            y="35"
            fill="white"
            font-family="Arial"
            className="select-none"
          >
            2番目のブロック
          </text>
        </g>
      </svg>
    </Card>
  );
}
