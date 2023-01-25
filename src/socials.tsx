import { useState } from "react";
import {
  SpeedDial,
  SpeedDialAction,
  Dialog,
  Stack,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  GitHub,
  LinkedIn,
  Telegram,
  Twitter,
  Email,
  ConnectWithoutContact,
  ContentCopy,
} from "@mui/icons-material";

interface ISocials {
  Icon: any;
  name: string;
  link: string;
  color:
    | "disabled"
    | "primary"
    | "action"
    | "info"
    | "inherit"
    | "secondary"
    | "error"
    | "success"
    | "warning"
    | undefined;
}

const env = import.meta.env;
const ContactEmail = env.VITE_CONTACT_EMAIL;

const actions: ISocials[] = [
  {
    Icon: Email,
    name: "Email",
    link: ContactEmail,
    color: "success",
  },
  {
    Icon: LinkedIn,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/sean-stocker-404149226/",
    color: "primary",
  },
  {
    Icon: GitHub,
    name: "GitHub",
    link: "https://github.com/sean-s14",
    color: "action",
  },
  {
    Icon: Telegram,
    name: "Telegram",
    link: "https://t.me/seanstocker",
    color: "primary",
  },
  {
    Icon: Twitter,
    name: "Twitter",
    link: "https://twitter.com/sean_s150",
    color: "info",
  },
];

export default function Socials() {
  const [openEmail, setOpenEmail] = useState(false);
  const [openCopiedMsg, setOpenCopiedMsg] = useState(false);

  function handleEmailOpen() {
    setOpenEmail(true);
  }

  function handleEmailClose() {
    setOpenEmail(false);
  }

  function copyEmailToClipboard() {
    setOpenCopiedMsg(true);
    navigator.clipboard.writeText(ContactEmail);
  }

  function handleCopiedMsgClose() {
    setOpenCopiedMsg(false);
  }

  function openSocial(link: string) {
    if (link === ContactEmail) {
      handleEmailOpen();
    } else {
      window.open(link, "_blank", "rel=noopener, popup=false");
    }
  }

  return (
    <>
      {/* ===== Socials ===== */}
      <SpeedDial
        ariaLabel="My Socials"
        sx={{ position: "absolute", top: 16, left: 16 }}
        icon={<ConnectWithoutContact fontSize="large" />}
        direction="down"
      >
        {actions.map(({ name, Icon, link, color }) => (
          <SpeedDialAction
            key={name}
            icon={<Icon color={color} />}
            tooltipTitle={name}
            sx={{
              bgcolor: "#333",
            }}
            onClick={() => openSocial(link)}
          />
        ))}
      </SpeedDial>

      {/* Dialog for Copying Contact Email */}
      <Dialog onClose={handleEmailClose} open={openEmail}>
        <Stack direction="row" spacing={2} sx={{ p: 2 }}>
          <TextField
            defaultValue={ContactEmail}
            disabled
            size="medium"
            sx={{
              width: 230,
              bgcolor: "#212121",
            }}
          />
          <IconButton
            size="large"
            sx={{ borderRadius: "50%" }}
            onClick={copyEmailToClipboard}
          >
            <ContentCopy sx={{ width: 30, height: 30 }} />
          </IconButton>
        </Stack>
      </Dialog>

      {/* "Copied" Message */}
      <Snackbar
        open={openCopiedMsg}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={1500}
        onClose={handleCopiedMsgClose}
        message="Email Copied"
      >
        <Alert
          onClose={handleCopiedMsgClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Email Copied
        </Alert>
      </Snackbar>
    </>
  );
}
