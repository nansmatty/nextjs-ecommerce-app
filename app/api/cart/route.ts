import { getCart } from '@/lib/actions';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const cart = await getCart();
		return NextResponse.json({ itemCount: cart?.size || 0 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ itemCount: 0 }, { status: 500 });
	}
}
