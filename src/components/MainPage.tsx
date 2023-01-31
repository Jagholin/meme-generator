import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  styled,
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

const TextTop = styled("p")(({theme}) => ({
  position: "absolute",
  fontSize: "3rem",
  color: theme.palette.primary.main,
  textAlign: "center",
  inset: "0",
}));

const TextBottom = styled("p")({
  position: "absolute",
  fontSize: "3rem",
  textAlign: "center",
  left: 0,
  right: 0,
  bottom: 0,
});

const DivFlexed = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
});

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
            <TextTop
              sx={{
                color: primaryColor,
                textShadow: `0 2px 2px ${shadowColor}, 0 -2px 2px ${shadowColor}, 2px 0 2px ${shadowColor}, -2px 0 2px ${shadowColor}`,
              }}
            >
              {memeTextTop}
            </TextTop>
            <TextBottom
              sx={{
                color: primaryColor,
                textShadow: `0 2px 2px ${shadowColor}, 0 -2px 2px ${shadowColor}, 2px 0 2px ${shadowColor}, -2px 0 2px ${shadowColor}`,
              }}
            >
              {memeTextBottom}
            </TextBottom>
          </CardMedia>
        </div>
        <CardContent>
          <Typography variant="body1" textAlign="center">
            {loaderData.data.data.memes[currentMemeIndex].name} (
            {currentMemeIndex + 1} out of {loaderData.data.data.memes.length})
          </Typography>
        </CardContent>
        <CardActions>
          <DivFlexed>
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
          </DivFlexed>
        </CardActions>
      </Card>
    </>
  );
}
