const FAQ = () => {
    return (
      <div className="mt-10 mb-16 px-2 md:px-0 bg-base-200">
        <div className="px-2">
          <h3 className="text-center text-4xl pt-8 pb-8 font-bold">
            Frequently Asked Questions
          </h3>
        </div>
        <div className="collapse bg-base-200">
          <input type="radio" name="my-accordion-2" defaultChecked />
          <div className="collapse-title text-xl font-bold">
            What is SurveyQuest?
          </div>
          <div className="collapse-content">
            <p className="text-[18px]">
            Survey Quest is a comprehensive survey platform that allows you to create, distribute and analyze surveys with ease. Whether you need to gather feedback for market research, academic studies or customer satisfaction, Survey Quest provides the tools to collect valuable insights.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-bold">
            Can I customize the look and feel of my surveys?
          </div>
          <div className="collapse-content">
            <p className="text-[18px]">
                Yes, Survey Quest allows you to customize the appearance of your surveys to match your brand or personal preferences. You can choose from a variety of themes, colors and fonts to create surveys that are visually appealing and engaging for your respondents.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-bold">
            What features are available for Pro-Users?
          </div>
          <div className="collapse-content">
            <p className="text-[18px]">
                Pro-Users on SurveyQuest have access to exclusive features such as the ability to add comments to surveys, advanced data analysis tools and priority support. Pro-Users can also access detailed survey results and analytics to better understand the feedback collected.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-bold">
            How is my data protected on Survey Quest?
          </div>
          <div className="collapse-content">
            <p className="text-[18px]">
                At SurveyQuest, we prioritize the security and privacy of your data. All data is encrypted and stored securely. We also use JWT authentication for secure access and follow best practices to ensure your data remains confidential and protected from unauthorized access.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default FAQ;