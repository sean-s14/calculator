import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, TextField, Stack, Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { blue, amber } from "@mui/material/colors";
import { evaluate } from "mathjs";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  minWidth: 80,
  minHeight: 80,
  fontSize: 32,
  p: 0,
}));

const Calculations: string[][] = [
  ["AC", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

type IOperations = "+" | "-" | "*" | "/" | "%" | "=";

export default function Calculator() {
  const [result, setResult] = useState("0");
  const [intermediaryResult, setIntermediaryResult] = useState(0);
  const [operation, setOperation] = useState<IOperations | null>(null);
  const [lastBtnPressed, setLastBtnPressed] = useState<string | null>(null);

  useEffect(() => {
    // console.log("Result :", result);
  }, [result]);

  useEffect(() => {
    // console.log("Intermediary Result :", intermediaryResult);
  }, [intermediaryResult]);

  useEffect(() => {
    if (operation !== null) {
      setLastBtnPressed(operation);
    }
    // console.log("Operation :", operation);
  }, [operation]);

  useEffect(() => {
    // console.log("Last Button Pressed :", lastBtnPressed);
  }, [lastBtnPressed]);

  function calculate(char: any) {
    if (char === "=") {
      setOperation(null);
    } else if (char === "×") {
      setOperation("*");
    } else if (char === "÷") {
      setOperation("/");
    } else {
      setOperation(char);
    }
    setLastBtnPressed(char);
    if (intermediaryResult !== 0) {
      setResult((prev) => {
        setIntermediaryResult(0);
        let num = evaluate(`${intermediaryResult} ${operation} ${prev}`);
        num = num.toFixed(2);
        if (num.includes(".")) {
          // Remove any trailing zero's
          num = parseFloat(num);
          num = num.toString();
        }
        return num;
      });
    }
  }

  function setChar(char: string) {
    if (char === "AC") {
      setResult("0");
      setIntermediaryResult(0);
      setOperation(null);
    } else if (char === ".") {
      setResult((prev) => {
        if (prev.includes(".")) {
          return prev;
        } else {
          return `${prev}.`;
        }
      });
    } else if ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(parseFloat(char))) {
      setResult((prev) => {
        if (
          lastBtnPressed !== null &&
          ["+", "-", "*", "/", "%"].includes(lastBtnPressed)
        ) {
          setIntermediaryResult(parseFloat(result));
          setLastBtnPressed(char);
          return char;
        } else if (lastBtnPressed === "=") {
          setLastBtnPressed(char);
          return char;
        } else {
          setLastBtnPressed(char);
          return `${prev === "0" ? "" : prev}${char}`;
        }
      });
    } else if (["=", "+", "-", "%", "×", "÷"].includes(char)) {
      calculate(char);
    } else if (char === "±") {
      setResult((prev) => {
        const num = parseFloat(prev);
        if (num < 0) {
          return String(Math.abs(num));
        } else {
          return String(-Math.abs(num));
        }
      });
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 2,
      }}
    >
      {/* Calculator */}
      <Stack sx={{ maxWidth: 400 }} spacing={2}>
        {/* Result */}
        <TextField
          disabled
          value={result}
          fullWidth
          sx={{
            bgcolor: "black",
            "& .MuiOutlinedInput-notchedOutline": {
              border: `${blue[200]} solid 2px !important`,
            },
            "& .MuiInputBase-input": {
              py: 0,
              pr: 6,
              fontSize: 80,
              textAlign: "right",
            },
          }}
        />

        {/* Buttons */}
        <Grid2 container spacing={1}>
          {Calculations.map((arr) =>
            arr.map((char, index) => (
              <Grid2 key={index} xs={char === "0" ? 6 : 3}>
                <Item>
                  <Button
                    onClick={() => setChar(char)}
                    sx={{
                      minHeight: "inherit",
                      width: "100%",
                      height: "100%",
                      fontSize: "inherit",
                      bgcolor:
                        (char === "×" && operation === "*") ||
                        (char === "÷" && operation === "/") ||
                        char === operation
                          ? amber[300]
                          : "inherit",
                    }}
                  >
                    {char}
                  </Button>
                </Item>
              </Grid2>
            ))
          )}
        </Grid2>
      </Stack>
    </Box>
  );
}
