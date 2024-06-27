import statsApi from '@/app/services/stats';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: any): Promise<any> {
  try {
    let response = await axios.get(`https://api.github.com/search/users?q=subgraphs`)
    let tdeveloper = statsApi.getTotalDevelopers('subgraphs')

    return NextResponse.json({ data: response.data }, { status: 201 });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}


export async function GET(req: NextRequest): Promise<any> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
