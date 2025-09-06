const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendOrderConfirmation(order, userEmail) {
    try {
      const mailOptions = {
        from: `"Shop-N-Post" <${process.env.SMTP_USER}>`,
        to: userEmail,
        subject: `Order Confirmation - #${order._id}`,
        html: this.generateOrderConfirmationHTML(order),
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Order confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
      throw error;
    }
  }

  async sendWelcomeEmail(userName, userEmail) {
    try {
      const mailOptions = {
        from: `"Shop-N-Post" <${process.env.SMTP_USER}>`,
        to: userEmail,
        subject: 'Welcome to Shop-N-Post!',
        html: this.generateWelcomeHTML(userName),
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Welcome email sent successfully');
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  }

  async sendPasswordResetEmail(userEmail, resetToken) {
    try {
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      
      const mailOptions = {
        from: `"Shop-N-Post" <${process.env.SMTP_USER}>`,
        to: userEmail,
        subject: 'Password Reset Request',
        html: this.generatePasswordResetHTML(resetUrl),
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Password reset email sent successfully');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }

  async sendNewsletterEmail(email, content) {
    try {
      const mailOptions = {
        from: `"Shop-N-Post Newsletter" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Shop-N-Post Newsletter',
        html: content,
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Newsletter email sent successfully');
    } catch (error) {
      console.error('Error sending newsletter email:', error);
      throw error;
    }
  }

  generateOrderConfirmationHTML(order) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
          .order-info { background: #f8f9fa; padding: 20px; margin: 20px 0; }
          .items { margin: 20px 0; }
          .item { border-bottom: 1px solid #eee; padding: 10px 0; }
          .total { font-weight: bold; font-size: 18px; }
          .footer { text-align: center; color: #666; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
            <p>Thank you for your order!</p>
          </div>
          
          <div class="order-info">
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> #${order._id}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
          </div>

          <div class="items">
            <h3>Order Items</h3>
            ${order.orderItems.map(item => `
              <div class="item">
                <p><strong>${item.name}</strong></p>
                <p>Quantity: ${item.quantity} × $${item.price} = $${(item.quantity * item.price).toFixed(2)}</p>
              </div>
            `).join('')}
          </div>

          <div class="order-info">
            <h3>Order Summary</h3>
            <p>Items Price: $${order.itemsPrice}</p>
            <p>Shipping: $${order.shippingPrice}</p>
            <p>Tax: $${order.taxPrice}</p>
            <p class="total">Total: $${order.totalPrice}</p>
          </div>

          <div class="order-info">
            <h3>Shipping Address</h3>
            <p>${order.shippingAddress.fullName}<br>
            ${order.shippingAddress.address}<br>
            ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br>
            ${order.shippingAddress.country}</p>
          </div>

          <div class="footer">
            <p>Thank you for shopping with Shop-N-Post!</p>
            <p>Visit us at <a href="${process.env.FRONTEND_URL}">Shop-N-Post</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateWelcomeHTML(userName) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Shop-N-Post</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .features { margin: 20px 0; }
          .feature { margin: 10px 0; padding: 10px; background: #f8f9fa; }
          .cta { text-align: center; margin: 30px 0; }
          .button { background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; }
          .footer { text-align: center; color: #666; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Shop-N-Post!</h1>
            <p>Hello ${userName}, thanks for joining us!</p>
          </div>
          
          <div class="content">
            <p>We're excited to have you as part of our community. Shop-N-Post offers the best online shopping experience with:</p>
            
            <div class="features">
              <div class="feature">🛍️ <strong>Wide Product Range:</strong> Thousands of products across multiple categories</div>
              <div class="feature">🚚 <strong>Fast Delivery:</strong> Quick and reliable shipping to your doorstep</div>
              <div class="feature">💳 <strong>Secure Payments:</strong> Multiple payment options with top-notch security</div>
              <div class="feature">📝 <strong>Expert Reviews:</strong> Read our detailed product reviews and blog posts</div>
            </div>

            <div class="cta">
              <a href="${process.env.FRONTEND_URL}/products" class="button">Start Shopping Now</a>
            </div>

            <p>Need help? Our customer support team is always ready to assist you. Feel free to reach out!</p>
          </div>

          <div class="footer">
            <p>Happy Shopping!<br>The Shop-N-Post Team</p>
            <p>Visit us at <a href="${process.env.FRONTEND_URL}">Shop-N-Post</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generatePasswordResetHTML(resetUrl) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Password Reset Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .cta { text-align: center; margin: 30px 0; }
          .button { background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin: 20px 0; }
          .footer { text-align: center; color: #666; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          
          <div class="content">
            <p>We received a request to reset your password for your Shop-N-Post account.</p>
            
            <div class="cta">
              <a href="${resetUrl}" class="button">Reset Your Password</a>
            </div>

            <div class="warning">
              <p><strong>Important:</strong> This link will expire in 1 hour for security reasons.</p>
            </div>

            <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
            
            <p>For security reasons, if you continue to receive these emails, please contact our support team.</p>
          </div>

          <div class="footer">
            <p>Best regards,<br>The Shop-N-Post Team</p>
            <p>Visit us at <a href="${process.env.FRONTEND_URL}">Shop-N-Post</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new EmailService();
