const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: 'serviceAccountKey.json',
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
});

const analyticsReporting = google.analyticsreporting({
    version: 'v4',
    auth: auth,
});

const analyticsService = {
    async trackEvent(eventDetails) {
        try {
            const response = await analyticsReporting.reports.batchGet({
                requestBody: {
                    reportRequests: [{
                        viewId: 'your_view_id',
                        dateRanges: [{
                            startDate: '7daysAgo',
                            endDate: 'today',
                        }],
                        dimensions: [{ name: 'ga:pagePath' }],
                        metrics: [{ expression: 'ga:pageviews' }],
                        orderBys: [{ fieldName: 'ga:pageviews', sortOrder: 'DESCENDING' }],
                    }],
                },
            });
            console.log('Google Analytics Antwort:', response.data);
            return { success: true, message: 'Ereignis erfolgreich verfolgt' };
        } catch (error) {
            console.error('Fehler bei der Verfolgung des Ereignisses:', error);
            return { success: false, message: 'Fehler bei der Verfolgung des Ereignisses' };
        }
    }
};

module.exports = analyticsService;
