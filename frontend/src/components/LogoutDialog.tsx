import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { CustomDialogTitle } from "./DialogTitle";
import { DialogBtn } from "../styles";
import { Logout } from "@mui/icons-material";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { defaultUser } from "../constants/defaultUser";
import { showToast } from "../utils";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface LogoutDialogProps {
  open: boolean;
  onClose: () => void;
}

export function LogoutDialog({ open, onClose }: LogoutDialogProps) {
  const n = useNavigate();
  const { setUser } = useContext(UserContext);
  const handleLogout = () => {
    setUser(defaultUser);
    Cookies.remove("token");
    onClose();
    showToast("You have been successfully logged out");
    n("/");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <CustomDialogTitle title="Logout Confirmation" onClose={onClose} icon={<Logout />} />
      <DialogContent>Are you sure you want to logout?</DialogContent>
      <DialogActions>
        <DialogBtn onClick={onClose}>Cancel</DialogBtn>
        <DialogBtn onClick={handleLogout} color="error">
          <Logout /> &nbsp; Logout
        </DialogBtn>
      </DialogActions>
    </Dialog>
  );
}
