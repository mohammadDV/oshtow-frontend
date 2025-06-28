import { ProfileActivities } from "../activities"
import { ProfileDetail } from "../detail"
import { ProfileHeader } from "../header"
import { ProfileReviews } from "../reviews"

export const UserProfile = () => {
    return (
        <div className="lg:max-w-5xl mx-auto px-4 lg:mt-10 mt-5">
            <ProfileHeader />
            <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-6 justify-between mt-5 lg:mt-8 relative items-start">
                <div className="lg:w-2/3">
                    <ProfileReviews />
                    <ProfileActivities />
                </div>
                <div className="lg:w-1/3 static top-6 lg:sticky">
                    <ProfileDetail />
                </div>
            </div>
        </div>
    )
}