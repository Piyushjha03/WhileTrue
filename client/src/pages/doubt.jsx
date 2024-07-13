import { CornerDownLeft, MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import Aside from "@/components/aside";
import MobileAside from "@/components/mobileaside";
import { askDoubt } from "@/api";
import { useState } from "react";
import MessageBubble from "@/components/messageBubble";
import { useNavigate, useSearchParams } from "react-router-dom";

export function Doubt() {
  const navigate = useNavigate();
  const [doubt, setDoubt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState([]); // [{message: "Hello", sender: "user"}, {message: "Hi", sender: "bot"}

  const [searchParams, setSearchParams] = useSearchParams();
  const cid = searchParams.get("cid");

  console.log("====================================");
  console.log(cid);
  console.log("====================================");

  function convertMarkdownToHTML(text) {
    // Convert **text** to <strong>text</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert __text__ to <u>text</u>
    text = text.replace(/__(.*?)__/g, "<u>$1</u>");

    text = text.replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>");

    return text;
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (doubt === "") return;
    const qry = doubt;

    document.querySelector(".innerchat").scrollTo({
      top: document.querySelector(".innerchat").scrollHeight,
      behavior: "smooth",
    });

    setLoading(true);
    setDoubt("");
    setConversation(() => [...conversation, { message: doubt, user: "user" }]);

    try {
      const res = await askDoubt({
        query: qry,
        videoID: cid,
      });
      const mssg = convertMarkdownToHTML(
        res.response.candidates[0].content.parts[0].text
      );

      setResponse(mssg);
      setConversation((prevConversation) => [
        ...prevConversation,
        { message: mssg, sender: "system" },
      ]);
    } catch (error) {
      setConversation(() => [
        ...conversation,
        {
          message: "Sorry, I am unable to answer your question",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="grid h-screen w-full sm:pl-[53px]">
        <Aside />
        <div className="flex flex-col  max-h-screen">
          <header className="sticky mt-4 top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileAside />

            <div className="relative ml-auto flex-1 md:grow-1">
              <button
                className="flex items-center gap-2 p-2 rounded-lg bg-accent text-accent-foreground"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Go Back
                <MoveLeft className="h-5 w-5" />
              </button>
            </div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <main className=" flex-1 gap-4 overflow-auto p-4 ">
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
              <div className="max-h-[100%] overflow-scroll ">
                <div className="innerchat w-full h-full flex flex-col gap-4">
                  {conversation.map((message, index) => (
                    <MessageBubble
                      key={index}
                      message={message.message}
                      user={message.user}
                    />
                  ))}
                  {loading && (
                    <>
                      <MessageBubble message="Thinking..." user="bot" />
                    </>
                  )}
                  <div className="pb-80" />
                </div>
              </div>
              <form className="absolute bottom-0 w-full left-0 overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
                <Label htmlFor="message" className="sr-only">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                  value={doubt}
                  onChange={(e) => setDoubt(e.target.value)}
                />
                <div className="flex items-center p-3 pt-0">
                  <Button
                    disabled={loading}
                    type="submit"
                    size="sm"
                    className="ml-auto gap-1.5"
                    onClick={(e) => handleClick(e)}
                  >
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
