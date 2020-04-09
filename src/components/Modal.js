/** @jsx jsx */
import React from "react"
import { IoIosClose as CloseIcon } from "react-icons/io"
import { IconButton, jsx } from "theme-ui"

const fixed = {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

export const Modal = React.memo(({ isOpen, onClose, children }) => {
  return (
    <div
      sx={{
        ...fixed,
        zIndex: 100,
        display: isOpen ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        sx={{
          ...fixed,
          backgroundColor: "rgb(17, 17, 17)",
          opacity: 0.875,
        }}
        onClick={onClose}
      />
      <div
        sx={{
          m: 2,
          p: 3,
          bg: "background",
          borderRadius: 8,
          position: "relative",
          minWidth: 320,
          maxWidth: 450,
          maxHeight: "90%",
          overflow: "scroll",
        }}
      >
        <IconButton
          sx={{ m: 1, position: "absolute", top: 0, right: 0 }}
          onClick={onClose}
        >
          <CloseIcon size={24} />
        </IconButton>
        {children}
      </div>
    </div>
  )
})
