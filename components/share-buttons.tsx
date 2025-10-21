"use client";

import { Button } from "@/components/ui/button";
import { Share2, Twitter, Linkedin, Facebook } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  text: string;
}

export function ShareButtons({ url, title, text }: ShareButtonsProps) {
  // For LinkedIn sharing, we'll use the production URL since LinkedIn needs to access it
  const shareUrl = url;
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const shareOnLinkedIn = () => {
    // Use a simpler LinkedIn sharing URL that works better
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(linkedinUrl, "_blank", "noopener,noreferrer");
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}&quote=${encodeURIComponent(title + " - " + text)}`;
    window.open(facebookUrl, "_blank", "noopener,noreferrer");
  };

  const shareGeneral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch (error) {
        console.log("Error sharing:", error);
        // Fallback: copy to clipboard
        try {
          await navigator.clipboard.writeText(shareUrl);
          // You could show a toast notification here
        } catch (clipboardError) {
          console.log("Error copying to clipboard:", clipboardError);
        }
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        // You could show a toast notification here
      } catch (error) {
        console.log("Error copying to clipboard:", error);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="outline"
        size="sm"
        className="glass-button cursor-pointer"
        onClick={shareOnTwitter}
      >
        <Twitter className="h-4 w-4 mr-2" />
        Twitter
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="glass-button cursor-pointer"
        onClick={shareOnLinkedIn}
      >
        <Linkedin className="h-4 w-4 mr-2" />
        LinkedIn
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="glass-button cursor-pointer"
        onClick={shareOnFacebook}
      >
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="glass-button cursor-pointer"
        onClick={shareGeneral}
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
    </div>
  );
}
