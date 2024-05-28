require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./database/connection.database');
const { initializeRoles } = require('./utilities/initializeRole.utilities');
const { initializeAdminUser } = require('./utilities/initializeUser.utilities');

const authenticationRoutes = require('./routes/authentication.routes');
const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');
const tagRoutes = require('./routes/tag.routes');
const categoryRoutes = require('./routes/category.routes');
const groupRoutes = require('./routes/group.routes');
const teamRoutes = require('./routes/team.routes');
const companyRoutes = require('./routes/company.routes');
const gameRoutes = require('./routes/game.routes');
const ticketRoutes = require('./routes/ticket.routes');
const photoRoutes = require('./routes/photo.routes');

const analyticsRoutes = require('./routes/analytics.routes');

const notificationRoutes = require('./routes/notification.routes');

const authenticationMiddleware = require('./middleware/authentication.middleware');

const app = express();

initializeRoles();
initializeAdminUser();

app.use(bodyParser.json());

app.use('/api/auth', authenticationRoutes);
app.use('/api/user', authenticationMiddleware, userRoutes);
app.use('/api/role', authenticationMiddleware, roleRoutes);
app.use('/api/tag', authenticationMiddleware, tagRoutes);
app.use('/api/category', authenticationMiddleware, categoryRoutes);
app.use('/api/group', authenticationMiddleware, groupRoutes);
app.use('/api/team', authenticationMiddleware, teamRoutes);
app.use('/api/company', authenticationMiddleware, companyRoutes);
app.use('/api/game', authenticationMiddleware, gameRoutes);
app.use('/api/ticket', authenticationMiddleware, ticketRoutes);
app.use('/api/photo', authenticationMiddleware, photoRoutes);

app.use('/api/analytics', authenticationMiddleware, analyticsRoutes);

app.use('/api/notification', authenticationMiddleware, notificationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
