import { NextResponse } from 'next/server';
import { utilities as defaultUtilities } from '@/lib/mock-data';
import type { Utility } from '@/lib/types';

// In-memory storage for the demo
let utilitiesData: Utility[] = [...defaultUtilities];

export async function GET() {
  return NextResponse.json(utilitiesData);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { electricity, water } = body;

    if (electricity) {
      const idx = utilitiesData.findIndex((u) => u.type === 'electricity');
      if (idx !== -1) {
        utilitiesData[idx] = {
          ...utilitiesData[idx],
          ...electricity,
          updatedAt: new Date().toISOString(),
        };
      }
    }

    if (water) {
      const idx = utilitiesData.findIndex((u) => u.type === 'water');
      if (idx !== -1) {
        utilitiesData[idx] = {
          ...utilitiesData[idx],
          ...water,
          updatedAt: new Date().toISOString(),
        };
      }
    }

    return NextResponse.json({ success: true, utilities: utilitiesData });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update utilities' }, { status: 400 });
  }
}
