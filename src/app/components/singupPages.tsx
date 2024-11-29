'use client';
import React from 'react';
import { Button, Input, Checkbox, Form, Watermark } from 'antd';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SignupFormValues {
  fullName: string;
  email: string;
  number: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const SignupPage: React.FC = () => {
  const [form] = Form.useForm<SignupFormValues>();

  const handleFinish = (values: SignupFormValues) => {
    if (values.password !== values.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    toast.success('Signup Successful! Welcome to our platform!');
    console.log('User details:', values);
  };

  const handleFinishFailed = () => {
    toast.error('Please correct the errors in the form.');
  };

  return (
    <Watermark content="Developer by AcciJob Student">
      <div className="min-h-screen bg-gradient-to-r from-purple-400 to-indigo-600 flex items-center justify-center relative">
        <div className="bg-white pl-5 pr-5 pt-1 rounded-lg shadow-lg w-full max-w-lg z-10 relative">
         
          <div className="flex justify-center mb-2">
            <Image
              src="/logo.png"  
              alt="Company Logo"
              className="h-16 w-auto"
              width={100}
              height={100}
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 text-center">Create Your Account</h2>
          <p className="text-gray-600 text-center">Developer by AcciJob Student</p>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
          >
            {/* Full Name */}
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[
                { required: true, message: 'Full Name is required' },
                { pattern: /^[a-zA-Z ]+$/, message: 'Only alphabets are allowed' },
              ]}
            >
              <Input placeholder="Enter your full name" className="rounded-md" />
            </Form.Item>

            {/* Email */}
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Enter a valid email' },
              ]}
            >
              <Input placeholder="Enter your email" className="rounded-md" />
            </Form.Item>

            {/* Phone Number */}
            <Form.Item
              name="number"
              label="Phone Number"
              rules={[
                { required: true, message: 'Phone number is required' },
                { pattern: /^[0-9]{10}$/, message: 'Enter a valid 10-digit number' },
              ]}
            >
              <Input placeholder="Enter your phone number" className="rounded-md" />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Password is required' },
                { min: 6, message: 'Password must be at least 6 characters' },
              ]}
            >
              <Input.Password placeholder="Enter your password" className="rounded-md" />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Confirm your password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your password" className="rounded-md" />
            </Form.Item>

            {/* Terms and Conditions */}
            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(new Error('You must agree to the terms and conditions')),
                },
              ]}
            >
              <Checkbox>
                <span className="text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-indigo-600 hover:underline">
                    terms and conditions
                  </a>
                </span>
              </Checkbox>
            </Form.Item>

            {/* Signup Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-md py-2"
              >
                Signup
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Toast Container for Notifications */}
        <ToastContainer />
      </div>
    </Watermark>
  );
};

export default SignupPage;
