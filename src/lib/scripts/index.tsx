import Script from "next/script"

export default function ScriptTags() {
  return (
    <>
      <Script
        type="text/javascript"
        src="https://www.dropbox.com/static/api/2/dropins.js"
        id="dropboxjs"
        data-app-key="YOUR_DROPBOX_APP_KEY"
        strategy="afterInteractive"
      ></Script>
    </>
  )
}
