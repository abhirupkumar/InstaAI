import { Footer } from "../_components/Footer";
import { Navbar } from "../_components/Navbar";

export default function TermsAndConditions() {
    return (
        <>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
                <div className="prose max-w-none">
                    <p>
                        These terms and conditions outline the rules and regulations for the use of Proxy's Website, located at <a href="http://proxy-akb.vercel.app/">http://proxy-akb.vercel.app/</a>.
                    </p>
                    <p>
                        By accessing this website we assume you accept these terms and conditions. Do not continue to use <a href="http://proxy-akb.vercel.app/">http://proxy-akb.vercel.app/</a> if you do not agree to take all of the terms and conditions stated on this page.
                    </p>
                    <p>
                        The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-4">Cookies</h2>
                    <p>
                        We employ the use of cookies. By accessing <a href="http://proxy-akb.vercel.app/">http://proxy-akb.vercel.app/</a>, you agreed to use cookies in agreement with the Proxy's Privacy Policy.
                    </p>
                    <p>
                        Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-4">License</h2>
                    <p>
                        Unless otherwise stated, Proxy and/or its licensors own the intellectual property rights for all material on <a href="http://proxy-akb.vercel.app/">http://proxy-akb.vercel.app/</a>. All intellectual property rights are reserved. You may access this from <a href="http://proxy-akb.vercel.app/">http://proxy-akb.vercel.app/</a> for your own personal use subjected to restrictions set in these terms and conditions.
                    </p>
                    <p>You must not:</p>
                    <ul className="list-disc pl-6">
                        <li>Republish material from <a href="http://proxy-akb.vercel.app/">http://proxy-akb.vercel.app/</a></li>
                        <li>Sell, rent or sub-license material from <a href="http://proxy-akb.vercel.app/">http://proxy-akb.vercel.app/</a></li>
                        <li>Reproduce, duplicate or copy material from <a href="http://proxy-akb.vercel.app/">http://proxy-akb.vercel.app/</a></li>
                        <li>Redistribute content from <a href="http://proxy-akb.vercel.app/">http://proxy-akb.vercel.app/</a></li>
                    </ul>

                    {/* Continue with the rest of the terms and conditions content... */}

                    <h2 className="text-2xl font-semibold mt-6 mb-4">Disclaimer</h2>
                    <p>
                        To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                    </p>
                    <ul className="list-disc pl-6">
                        <li>limit or exclude our or your liability for death or personal injury;</li>
                        <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                        <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                        <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                    </ul>
                    <p>
                        The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
                    </p>
                    <p>
                        As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
                    </p>
                </div>
            </main>
            <Footer />
        </>
    )
}

