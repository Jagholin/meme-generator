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
  const [memeTextTop, setMemeTextTop] = useState("");
  const [memeTextBottom, setMemeTextBottom] = useState("");
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
            <p
              style={{
                position: "absolute",
                fontSize: "3rem",
                color: primaryColor,
                textAlign: "center",
                inset: "0",
                textShadow: `0 2px 2px ${shadowColor}, 0 -2px 2px ${shadowColor}, 2px 0 2px ${shadowColor}, -2px 0 2px ${shadowColor}`,
              }}
            >
              {memeTextTop}
            </p>
            <p
              style={{
                position: "absolute",
                fontSize: "3rem",
                color: primaryColor,
                textAlign: "center",
                textShadow: `0 2px 2px ${shadowColor}, 0 -2px 2px ${shadowColor}, 2px 0 2px ${shadowColor}, -2px 0 2px ${shadowColor}`,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              {memeTextBottom}
            </p>
          </CardMedia>
        </div>
        <CardContent>
          <Typography variant="body1" textAlign="center">
            {loaderData.data.data.memes[currentMemeIndex].name}
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
              >
                Previous Image
              </Button>
              <Button
                variant="outlined"
                onClick={() => setCurrentMemeIndex((a) => a + 1)}
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

            <TextField
              fullWidth
              label={"Meme text top"}
              value={memeTextTop}
              onChange={(e) => setMemeTextTop(e.target.value)}
            />
            <TextField
              fullWidth
              label={"Meme text bottom"}
              value={memeTextBottom}
              onChange={(e) => setMemeTextBottom(e.target.value)}
            />
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
