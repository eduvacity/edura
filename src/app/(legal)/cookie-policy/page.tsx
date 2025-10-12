import Link from "next/link"

export default function CookiePolicy() {
  return (
    <div className="w-full relative flex min-h-[100vh] place-content-center overflow-hidden px-1 lg-md:px-4 py-24">
      <div className="w-full flex flex-col gap-4 max-w-[1280px] z-50 bg-white px-12 py-14">
        <div className="w-full flex flex-col gap-4 max-w-[1280px] z-50 bg-white px-12 py-14">
          <h1 className="w-full text-xl lg:text-2xl xl:text-[28px]/[30px] text-[#011B23] tracking-[0.5px] text-center font-semibold font-sans px-4 uppercase">
            Cookie policy
          </h1>
          <p className="w-full text-center text-base/[30.4px] font-normal font-sans text-[#4B4B4B] tracking-[0.5px]">
            Last Updated: October 24, 2024
          </p>
        </div>
        <div className="w-full flex flex-col gap-4">
          <h6 className=" text-justify text-[20px]/[30px] font-medium font-sans text-[#011B23]">
            What are cookies?
          </h6>
          <p className=" text-justify font-arial font-normal text-base text-[#011B23] flex flex-col gap-4">
            We may collect information using “cookies.” Cookies are small data
            files stored on the hard drive of your computer or mobile device by
            a App. We may use both session cookies (which expire once you close
            your web browser) and persistent cookies (which stay on your
            computer or mobile device until you delete them) to provide you with
            a more personal and interactive experience on our App.
            <span className="block">
              We use two broad categories of cookies: (1) first party cookies,
              served directly by us to your computer or mobile device, which are
              used only by us to recognize your computer or mobile device when
              it revisits our App; and (2) third party cookies, which are served
              by service providers on our App, and can be used by such service
              providers to recognize your computer or mobile device when it
              visits other Apps.
            </span>
          </p>
          <h6 className="text-justify text-[20px]/[30px] font-medium font-sans text-[#011B23]">
            Cookies we use
          </h6>
          <p className=" text-justify font-arial font-normal text-base text-[#011B23] flex flex-col gap-4">
            Our App uses the following types of cookies for the purposes set out
            below:
          </p>
          <div className="w-full overflow-hidden rounded-lg border border-solid border-primary">
            <table className="table-fixed py-8 table min-w-full border-collapse">
              <thead>
                <tr className="w-full border-b border-solid border-primary px-4">
                  <th className="text-left w-[200px] text-[20px]/[24.2px] font-medium font-sans text-[#011B23] border-r border-solid border-primary p-4">
                    Type of cookie
                  </th>
                  <th className="text-left text-[20px]/[30px] font-medium font-sans text-[#011B23] border-r border-solid border-primary p-4">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="w-full border-b border-solid border-primary py-8 px-4">
                  <td className="p-4 text-left font-arial font-normal text-base text-[#011B23] border-r border-solid border-primary">
                    Essential Cookies
                  </td>
                  <td className="text-left font-arial font-normal text-base text-[#011B23] p-4">
                    These cookies are essential to provide you with services
                    available through our App and to enable you to use some of
                    its features. For example, they allow you to log in to
                    secure areas of our App and help the content of the pages
                    you request load quickly. Without these cookies, the
                    services that you have asked for cannot be provided, and we
                    only use these cookies to provide you with those services.
                  </td>
                </tr>
                <tr className="border-b border-solid border-primary">
                  <td className="p-4 text-left font-arial font-normal text-base text-[#011B23] border-r border-solid border-primary">
                    Functionality Cookies
                  </td>
                  <td className="text-left font-arial font-normal text-base text-[#011B23] p-4">
                    These cookies allow our App to remember choices you make
                    when you use our App, such as remembering your language
                    preferences, remembering your login details and remembering
                    the changes you make to other parts of our App which you can
                    customize. The purpose of these cookies is to provide you
                    with a more personal experience and to avoid you having to
                    re-enter your preferences every time you visit our App.
                  </td>
                </tr>
                <tr className="border-b border-solid border-primary">
                  <td className="p-4 text-left font-arial font-normal text-base text-[#011B23] border-r border-solid border-primary">
                    Analytics and Performance Cookies
                  </td>
                  <td className="text-left font-arial font-normal text-base text-[#011B23] p-4">
                    These cookies are used to collect information about traffic
                    to our App and how users use our App. The information
                    gathered does not identify any individual visitor. It
                    includes the number of visitors to our App, the Apps that
                    referred them to our App, the pages they visited on our App,
                    what time of day they visited our App, whether they have
                    visited our App before, and other similar information. We
                    use this information to help operate our App more
                    efficiently, to gather broad demographic information and to
                    monitor the level of activity on our App.
                    <span className="my-4">
                      We use Google Analytics for this purpose. Google Analytics
                      uses its own cookies. It is only used to improve how our
                      App works. You can find out more information about Google
                      Analytics cookies here:{" "}
                      <Link
                        target="_blank"
                        href="https://developers.google.com/analytics/resources/concepts/gaConceptsCookies"
                      >
                        https://developers.google.com/analytics/resources/concepts/gaConceptsCookies
                      </Link>
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-solid border-primary">
                  <td className="p-4 text-left font-arial font-normal text-base text-[#011B23] border-r border-solid border-primary">
                    Targeted and advertising cookies
                  </td>
                  <td className="text-left font-arial font-normal text-base text-[#011B23] p-4">
                    These cookies track your browsing habits to enable us to
                    show advertising which is more likely to be of interest to
                    you. These cookies use information about your browsing
                    history to group you with other users who have similar
                    interests. Based
                  </td>
                </tr>
                <tr className="border-b border-solid border-primary">
                  <td className="p-4 text-left font-arial font-normal text-base text-[#011B23] border-r border-solid border-primary">
                    Targeted and advertising cookies
                  </td>
                  <td className="text-left font-arial font-normal text-base text-[#011B23] p-4">
                    on that information, and with our permission, third party
                    advertisers can place cookies to enable them to show adverts
                    which we think will be relevant to your interests while you
                    are on third party Apps.
                    <span className="my-4">
                      You can disable cookies which remember your browsing
                      habits and target advertising at you by visiting{" "}
                      <Link
                        target="_blank"
                        href="http://www.youronlinechoices.com/uk/your-ad-choices"
                      >
                        http://www.youronlinechoices.com/uk/your-ad-choices
                      </Link>
                      . If you choose to remove targeted or advertising cookies,
                      you will still see adverts but they may not be relevant to
                      you. Even if you do choose to remove cookies by the
                      companies listed at the above link, not all companies that
                      serve online behavioral advertising are included in this
                      list, and so you may still receive some cookies and
                      tailored adverts from companies that are not listed.
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 text-left font-arial font-normal text-base text-[#011B23] border-r border-solid border-primary">
                    Social Media Cookies
                  </td>
                  <td className="text-left font-arial font-normal text-base text-[#011B23] p-4">
                    These cookies are used when you share information using a
                    social media sharing button or “like” button on our App or
                    you link your account or engage with our content on or
                    through a social networking App such as Facebook, Twitter or
                    Google+. The social network will record that you have done
                    this.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 mt-6">
          <h2 className=" text-justify text-[30px]/[28px] font-bold font-arialBold text-[#011B23]">
            Disabling cookies
          </h2>
          <p className=" text-justify font-arial font-normal text-base text-[#011B23] flex flex-col gap-4">
            You can typically remove or reject cookies via your browser
            settings. In order to do this, follow the instructions provided by
            your browser (usually located within the &quot;settings, &quot;
            &quot;help &quot; &quot;tools &quot; or &quot;edit &quot; facility).
            Many browsers are set to accept cookies until you change your
            settings.
            <span className="block">
              If you do not accept our cookies, you may experience some
              inconvenience in your use of our App. For example, we may not be
              able to recognize your computer or mobile device and you may need
              to log in every time you visit our App.
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
