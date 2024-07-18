import dbConnect from '@/lib/dbConnect';
import { auth } from '@/middleware/auth';
import Work from '@/models/Work';

export async function GET(req, res) {
    const authResult = await auth(req);
    if (authResult.status === 401) {
        return authResult; 
    }

    await dbConnect();

    try {
        const works = await Work.find();
        return Response.json({ success: true, data: works });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}
