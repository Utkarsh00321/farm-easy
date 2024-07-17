import dbConnect from '@/lib/dbConnect';
import Work from '@/models/Work';
import Farmer from '@/models/Farmer';

// get all the works posted by a particular farmer
export async function GET(req) {
    await dbConnect();

    try {
        const {searchParams} = new URL(req.url);
        const farmerId = searchParams.get('farmerId');
        
        // Check if farmerId is provided
        if (!farmerId) {
            return Response.json({ success: false, error: 'Missing farmerId in query parameters' });
        }

        // Fetch works posted by the specified farmer
        const works = await Work.find({ farmer: farmerId });

        return Response.json({ success: true, data: works });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}

// post the work 
export async function POST(req){
    await dbConnect();

    try {
        const { farmer, ...workData } = await req.json();

        // Check if the farmer exists
        const getfarmer = await Farmer.findById(farmer);
        
        if (!getfarmer) {
            return Response.json({ success: false, error: 'Farmer not found' },{status:500});
        }

        // Create new work
        const work = await Work.create({ ...workData, farmer: getfarmer });

        // Update farmer's postedWorks array
        await Farmer.findByIdAndUpdate(getfarmer, { $push: { postedWorks: work._id } });

        return Response.json({ success: true, data: work });
      } catch (error) {
        return Response.json({ success: false, error: error.message });
      }
}

// delete a specific work posted by a farmer
export async function DELETE(req, res) {
    await dbConnect();

    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id');

        const work = await Work.findById(id);
        console.log(work)
        if (!work) {
            return Response.json({ success: false, error: 'Work not found' });
        }

        // Remove the work from the farmer's postedWorks array
        await Farmer.findByIdAndUpdate(work.farmer, { $pull: { postedWorks: id } });

        // Delete the work document
        await Work.deleteOne({ _id: id });
        return Response.json({ success: true, data: {} });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}