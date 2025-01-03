import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { ErrorPage } from '@edx/frontend-platform/react';
import { Container } from '@edx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import BulkEmailTaskManager from './bulk-email-task-manager/BulkEmailTaskManager';
import NavigationTabs from '../navigation-tabs/NavigationTabs';
import BulkEmailForm from './bulk-email-form';
import { CourseMetadataContext } from '../page-container/PageContainer';
import { BulkEmailProvider } from './bulk-email-context';
import BackToInstructor from '../navigation-tabs/BackToInstructor';

export default function BulkEmailTool() {
  const { courseId } = useParams();
  useEffect(() => {
    let courseIDs = [
      "course-v1:TalentSprint+BCDM+2024",
      "course-v1:TalentSprint+MLOP+2024",
      "course-v1:TalentSprint+AOSCF+2024",
      "course-v1:TalentSprint+AOSCDC1+2024",
      "course-v1:TalentSprint+AIMLOPS1+2024",
      "course-v1:QUINCE+TestingAnalyticsloadissue+C01",
    ];

    const tag = document.querySelector(".logo");
    let logoImage;
    if (tag.tagName === "IMG") {
      logoImage = document.querySelector(".logo");
    } else {
      logoImage = tag.querySelector("img");
    }

    courseIDs.map((item) => {
      if (window.location.pathname.includes(item)) {
        logoImage.src =
          "https://static.talentsprint.com/lms_maple/images/iiith_logo.png";
      }
    });
  }, []);

  return (
    <CourseMetadataContext.Consumer>
      {(courseMetadata) => (courseMetadata.originalUserIsStaff ? (
        <>
          <NavigationTabs courseId={courseId} tabData={courseMetadata.tabs} />
          <BulkEmailProvider>
            <Container size="md">
              <BackToInstructor courseId={courseId} />
              <div className="row pb-4.5">
                <h1 className="text-primary-500" id="main-content">
                  <FormattedMessage
                    id="bulk.email.send.email.header"
                    defaultMessage="Send an email"
                    description="A label for email form"
                  />
                </h1>
              </div>
              <div className="row">
                <BulkEmailForm
                  courseId={courseId}
                  cohorts={courseMetadata.cohorts}
                  courseModes={courseMetadata.courseModes}
                />
              </div>
              <div className="row py-5">
                <BulkEmailTaskManager courseId={courseId} />
              </div>
            </Container>
          </BulkEmailProvider>
        </>
      ) : (
        <ErrorPage />
      ))}
    </CourseMetadataContext.Consumer>
  );
}
