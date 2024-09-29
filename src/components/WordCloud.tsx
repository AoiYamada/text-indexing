"use client";

// Copy and edit from
// https://airbnb.io/visx/wordcloud
import React, { FC, useState } from "react";
import { Text } from "@visx/text";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import { scaleLog } from "@visx/scale";
import { Wordcloud as VisxWordCloud } from "@visx/wordcloud";
import { StatsItem } from "@/app/api/stats/_types";

type WordCloudProps = {
  data: StatsItem[];
};

type WordData = {
  text: string;
  value: number;
};

type SpiralType = "archimedean" | "rectangular";

const WordCloud: FC<WordCloudProps> = ({ data }) => {
  const words = data.map((d) => ({ text: d.term, value: d.count }));
  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [10, 100],
  });
  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

  const fixedValueGenerator = () => 0.5;
  const [spiralType] = useState<SpiralType>("archimedean");
  const [withRotation] = useState(false);

  return (
    <div className="wordcloud w-full h-[400px]">
      <ParentSize>
        {({ width, height }) => (
          <VisxWordCloud
            words={words}
            width={width}
            height={height}
            fontSize={fontSizeSetter}
            font={"Impact"}
            padding={2}
            spiral={spiralType}
            rotate={withRotation ? getRotationDegree : 0}
            random={fixedValueGenerator}
          >
            {(cloudWords) =>
              cloudWords.map((w, i) => (
                <Text
                  key={w.text}
                  fill={colors[i % colors.length]}
                  textAnchor={"middle"}
                  transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                  fontSize={w.size}
                  fontFamily={w.font}
                >
                  {w.text}
                </Text>
              ))
            }
          </VisxWordCloud>
        )}
      </ParentSize>
      <style jsx>{`
        .wordcloud {
          display: flex;
          flex-direction: column;
          user-select: none;
        }
        .wordcloud svg {
          margin: 1rem 0;
          cursor: pointer;
        }

        .wordcloud label {
          display: inline-flex;
          align-items: center;
          font-size: 14px;
          margin-right: 8px;
        }
        .wordcloud textarea {
          min-height: 100px;
        }
      `}</style>
    </div>
  );
};

export default WordCloud;

function getRotationDegree() {
  const rand = Math.random();
  const degree = rand > 0.5 ? 60 : -60;

  return rand * degree;
}
const colors = ["#143059", "#2F6B9A", "#82a6c2"];
