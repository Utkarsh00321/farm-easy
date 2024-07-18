import dbConnect from '@/lib/dbConnect';
import Work from '@/models/Work';

export async function GET(req, res) {
    await dbConnect();

    try {
        const works = await Work.find();
        return Response.json({ success: true, data: works });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}
