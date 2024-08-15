import { useRef } from "react";

export function useCopyToClipboard() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const copyText = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.select();
      document.execCommand("copy");
      alert("Text copied!");
    }
  };

  return { textareaRef, copyText };
}
