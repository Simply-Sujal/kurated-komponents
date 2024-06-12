import React from 'react'
import HomeLandingPage from '../Home/HomeLandingPage'
import AvoidingDependency from '../Home/AvoidingDependency'
import UseOurLibrary from '../Home/UseOurLibrary'
import ChoosingKodeKomp from '../Home/ChoosingKodeKomp'
import SupportingTech from '../Home/SupportingTech'
import MainFeature from '../Home/MainFeature'
import OurSpeciality from '../Home/OurSpeciality'
import JoinOurCommunity from '../Home/JoinOurCommunity'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
    return (
        <>
            <HomeLandingPage />
            <AvoidingDependency />
            <UseOurLibrary />
            <ChoosingKodeKomp />
            <SupportingTech />
            <MainFeature />

            {/* here I will add our latest components example for about 20 or 25  */}
            {/* <OurInbuiltComponents /> */}

            <OurSpeciality />
            <JoinOurCommunity />
            <Newsletter />
            <Footer />

        </>
    )
}

export default Home