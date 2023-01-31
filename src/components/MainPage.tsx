import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import useStyles from "../theme";
import domtoimage from "dom-to-image";
import EditableContainer from "./EditableContainer";
import MemeText from "./MemeText";

interface MemeItem {
  height: number;
  width: number;
  id: string;
  name: string;
  url: string;
}

interface MemeData {
  memes: MemeItem[];
}

interface MemeLoaderData {
  status: number;
  statusText: string;
  data: {
    data: MemeData;
  };
}

export default function MainPage() {
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0);
  // const [memeTextTop, setMemeTextTop] = useState("");
  // const [memeTextBottom, setMemeTextBottom] = useState("");
  const [memeText, setMemeText] = useState<string[]>([
    "text top",
    "text bottom",
  ]);
  const loaderData = useLoaderData() as MemeLoaderData;
  const { classes } = useStyles();
  const imageElement = useRef<HTMLDivElement>(null);
  const [primaryColor, setPrimaryColor] = useState("black");
  const [shadowColor, setShadowColor] = useState("white");

  const handleSaveImage = () => {
    if (imageElement.current) {
      domtoimage.toPng(imageElement.current).then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-meme-image.png";
        link.href = dataUrl;
        link.click();
      });
    }
  };

  const handleTextColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setPrimaryColor("white");
      setShadowColor("black");
    } else {
      setPrimaryColor("black");
      setShadowColor("white");
    }
  };

  console.log(loaderData);
  return (
    <>
      <Card>
        <div ref={imageElement}>
          <CardMedia
            sx={{
              height: "500px",
              maxWidth: "600px",
              backgroundSize: "contain",
              position: "relative",
              marginInline: "auto",
            }}
            image={loaderData.data.data.memes[currentMemeIndex].url}
            title={loaderData.data.data.memes[currentMemeIndex].name}
          >
            <EditableContainer>
              {memeText.map((text, idx) => (
                <MemeText
                  primaryColor={primaryColor}
                  shadowColor={shadowColor}
                  memeText={text}
                  key={idx}
                />
              ))}
            </EditableContainer>
          </CardMedia>
        </div>
        <CardContent>
          <Typography variant="body1" textAlign="center">
            {loaderData.data.data.memes[currentMemeIndex].name} (
            {currentMemeIndex + 1} out of {loaderData.data.data.memes.length})
          </Typography>
        </CardContent>
        <CardActions>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              width: "100%",
            }}
          >
            <div style={{ marginInline: "auto" }}>
              <Button
                variant="outlined"
                onClick={() =>
                  setCurrentMemeIndex((a) => (a === 0 ? a : a - 1))
                }
                className={classes.button}
                color="primary"
              >
                Previous Image
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  setCurrentMemeIndex((a) =>
                    a === loaderData.data.data.memes.length - 1 ? a : a + 1
                  )
                }
                className={classes.button}
              >
                Next
              </Button>
            </div>

            <Stack
              direction={"row"}
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Typography>black text</Typography>
              <Switch
                onChange={handleTextColor}
                checked={primaryColor === "white"}
                value="on"
              ></Switch>
              <Typography>white text</Typography>
            </Stack>
            {memeText.map((text, idx) => (
              <TextField
                fullWidth
                label={`Meme text ${idx}`}
                value={text}
                onChange={(e) =>
                  setMemeText((t) =>
                    t.map((v, id) => (id === idx ? e.target.value : v))
                  )
                }
                key={idx}
              />
            ))}
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleSaveImage}
            >
              Save image...
            </Button>
          </div>
        </CardActions>
      </Card>
    </>
  );
}
