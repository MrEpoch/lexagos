"use client"
import { useLang } from '@/providers/LangContext';
import React from 'react'
import { Button } from '../ui/button';

export default function LanguageSwitch() {

  const { toggleLangHandler, isEnglish } = useLang() as { toggleLangHandler: () => void; isEnglish: boolean };

  return (
    <Button variant="outline" className="w-fit" onClick={toggleLangHandler}>
      {isEnglish ? "cz" : "en"}
    </Button>
  )
}
