import React, { Key, ReactElement } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ReactNode } from "react";
import MemeText, { MemeTextProps, BoundingBox } from "./MemeText";

interface EditableContainerProps {
  children: ReactElement<MemeTextProps>[];
}

export default function EditableContainer({
  children,
}: EditableContainerProps) {
  const [bbMap, setBBMap] = useState<Map<Key, BoundingBox>>(new Map());
  const [selectedChild, setSelectedChild] = useState<Key>("");

  return (
    <>
      {React.Children.map(children, (child) => {
        console.log("see a child of type, ", child.type);
        if (child.key === null) {
          console.error(
            "Child of <EditableContainer> doesn't have a key - ignoring"
          );
          return child;
        }
        let bb = bbMap.get(child.key);
        if (!bb) {
          bb = new BoundingBox();
          setBBMap(
            new Map(
              Array.from(bbMap.entries()).concat([[child.key, bb]])
            )
          );
        }
        const key = child.key;
        if (child.key !== selectedChild) {
          return React.cloneElement(child, {
            bb,
            css: {
              cursor: "pointer"
            },
            onPointerDown: () => setSelectedChild(key),
          });
        }
        return (<div >
          {
            React.cloneElement(child, {bb, css: {
                cursor: 'grab'
              },
              onPointerDown: () => setSelectedChild(key),
            })
          }
        </div>);
      })}
    </>
  );
}
