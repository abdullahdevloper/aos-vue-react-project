import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function ConfirmBox({ open = false, title = "Confirm action", onClose }: { open?: boolean; title?: string; onClose?: () => void }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>This action is ready to be confirmed.</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onClose}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}
