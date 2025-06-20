import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'İçerik gerekli' },
        { status: 400 }
      );
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API anahtarı yapılandırılmamış' },
        { status: 500 }
      );
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: content,
    });

    return NextResponse.json({ response: response.text });
  } catch (error) {
    console.error('Gemini API hatası:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
