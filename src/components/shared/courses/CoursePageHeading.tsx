'use client';
import { useLang } from '@/providers/LangContext';
import { coursesPage } from '@/texts/Course-actions';
import React from 'react'
export const CoursePageHeading = (props : {}) => {

  const { isEnglish } = useLang() as { isEnglish: boolean };

  return (
     <h1 className="text-3xl font-semibold text-start w-full sm:px-6 lg:px-8">
        {coursesPage[isEnglish ?? true ? "en" : "cz"].header}:
      </h1>  )
}
     
