"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import Image from "next/image";
import { Clipboard } from "lucide-react";

export default function ContactsTable() {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: text + " copied to clipboard",
      });
    }
  };

  return (
    <Table role="contact-table">
      <TableCaption role="contact-table-caption">Contact choices</TableCaption>
      <TableHeader role="contact-table-header">
        <TableRow role="contact-table-row-header">
          <TableHead className="">Contact Type</TableHead>
          <TableHead>Text</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow role="contact-table-row-1">
          <TableCell className="font-medium">Email</TableCell>
          <TableCell>projekt@mail.com</TableCell>
          <TableCell className="text-right">
            <Button
              onClick={() => copyToClipboard("projekt@mail.com")}
              variant="secondary"
            >
              <Clipboard role="image-item" />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow role="contact-table-row-2">
          <TableCell className="font-medium">Phone</TableCell>
          <TableCell>(+420) 777 777 777</TableCell>
          <TableCell className="text-right">
            <Button
              onClick={() => copyToClipboard("(+420) 777 777 777")}
              variant="secondary"
            >
              <Clipboard role="image-item" />
            </Button>
          </TableCell>
        </TableRow>
        <TableRow role="contact-table-row-3">
          <TableCell className="font-medium">Instagram</TableCell>
          <TableCell>@projekt</TableCell>
          <TableCell className="text-right">
            <Button asChild variant="secondary">
              <Link href="https://www.instagram.com">
                <Image
                  role="image-item"
                  src={"/social-icons/Instagram_Glyph_Gradient.png"}
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </Link>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow role="contact-table-row-4">
          <TableCell className="font-medium">X</TableCell>
          <TableCell>@projekt</TableCell>
          <TableCell className="text-right">
            <Button asChild variant="secondary">
              <Link href="https://www.twitter.com">
                <Image
                  role="image-item"
                  src={"/social-icons/logo-white.png"}
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </Link>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow role="contact-table-row-5">
          <TableCell className="font-medium">Facebook</TableCell>
          <TableCell>@projekt</TableCell>
          <TableCell className="text-right">
            <Button asChild variant="secondary">
              <Link href="https://www.facebook.com">
                <Image
                  role="image-item"
                  src={"/social-icons/Facebook_Logo_Primary.png"}
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </Link>
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
