export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  outline: "none",
  borderRadius: "0.5rem",
  boxShadow: 24,
  p: 4,
  width: 500, // Set a default width for mobile

  "@media (max-width: 600px)": {
    // Set width to 500px for screens with a minimum width of 600px (desktop)
    width: "80%",
  },
};
