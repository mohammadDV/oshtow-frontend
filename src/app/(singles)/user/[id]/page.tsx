import { getUser } from "../_api/getUser";
import { getReviews } from "../_api/getReviews";
import { ProfileActivities } from "../_components/activities";
import { ProfileDetail } from "../_components/detail";
import { ProfileHeader } from "../_components/header";
import { ProfileReviews } from "../_components/reviews";

interface UserPageProps {
    params: Promise<{
        id: string;
    }>;
    searchParams: Promise<{
        page?: string;
        query?: string;
        column?: string;
    }>;
}

export default async function UserPage({ params, searchParams }: UserPageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const page = parseInt(resolvedSearchParams.page || '1');
    const query = resolvedSearchParams.query;
    const column = resolvedSearchParams.column;

    const [userData, reviewsData] = await Promise.all([
        getUser({ id: resolvedParams.id }),
        getReviews({
            id: resolvedParams.id,
            page,
            query: column === 'rate' ? query : undefined,
            column: column === 'rate' ? 'rate' : undefined,
        })
    ]);

    return (
        <div className="lg:max-w-5xl mx-auto px-4 lg:mt-10 mt-5">
            <ProfileHeader data={userData} />
            <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-6 justify-between mt-5 lg:mt-8 relative items-start">
                <div className="lg:w-2/3">
                    <ProfileReviews data={reviewsData} />
                    <ProfileActivities
                        sendersData={userData.sender_projects}
                        passengersData={userData.passenger_projects}
                    />
                </div>
                <div className="w-full lg:w-1/3 static top-6 lg:sticky">
                    <ProfileDetail
                        userInfo={userData.user}
                        sendersCount={userData.sender_projects_count}
                        passengersCount={userData.passenger_projects_count}
                    />
                </div>
            </div>
        </div>
    );
}