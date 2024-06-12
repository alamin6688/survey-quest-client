const HowItWorks = () => {

    return (
      <section className="bg-[#1F2937] pt-12 pb-16 px-5 mt-16 rounded-xl">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white">How It Works</h2>
          <p className="mt-4 text-lg text-gray-200">
            Discover how easy it is to create and participate in surveys on our platform.
          </p>
        </div>
  
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-200 p-6 rounded-lg shadow-xl ">
            <h3 className="text-xl font-semibold text-gray-900">1. Create a Survey</h3>
            <p className="mt-2 text-gray-600">
              Start by creating a survey with your questions and options. Set the category and deadline for responses.
            </p>
          </div>
  
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900">2. Share Your Survey</h3>
            <p className="mt-2 text-gray-600">
              Share your survey link with participants via email, social media, or embed it on your website.
            </p>
          </div>
  
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900">3. Collect Responses</h3>
            <p className="mt-2 text-gray-600">
              Gather responses in real-time as participants fill out your survey. View analytics to understand the results.
            </p>
          </div>
  
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900">4. Analyze Results</h3>
            <p className="mt-2 text-gray-600">
              Use our platform to analyze the results of your survey through charts and graphs, helping you make informed decisions.
            </p>
          </div>
  
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900">5. Feedback & Improvements</h3>
            <p className="mt-2 text-gray-600">
              Get feedback from your survey participants and make necessary improvements to your offerings.
            </p>
          </div>
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900">6. Step 5: Take Action</h3>
            <p className="mt-2 text-gray-600">
            Use the insights from your data analysis to make improvements and take actionable steps to enhance your services or products.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  