"use client";

import React from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Divider,
  Space,
  message,
} from "antd";
import type { UserRole } from "../../types/user-role";
import { RoleBadge, roleLabel } from "./role-badge";

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  role: UserRole;
  onSubmit?: (values: LoginFormValues, role: UserRole) => Promise<void> | void;
};

const roleIntro: Record<UserRole, string> = {
  "set-executive": "Sign in to access executive dashboards and approvals.",
  "rnd-associate": "Sign in to manage experiments and R&D tasks.",
  head: "Sign in to review reports and oversee operations.",
  lead: "Sign in to coordinate your team and track progress.",
  admin: "Sign in to administer users, roles, and system settings.",
};

export default function LoginForm({ role, onSubmit }: LoginFormProps) {
  const [form] = Form.useForm<LoginFormValues>();
  const [loading, setLoading] = React.useState(false);

  const handleFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      if (onSubmit) {
        await onSubmit(values, role);
      } else {
        // Fallback: purely client-side feedback
        console.log("[login] submitting", { role, values });
        if (roleLabel && role in roleLabel) {
          message.success(`Logged in as ${roleLabel[role]} (demo)`);
        } else {
          message.success(`Logged in as ${role} (demo)`);
        }
      }
    } catch (err: any) {
      message.error(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <Card
        style={{ width: 420 }}
        aria-label={`${roleLabel[role]} Login`}
        title={
          <Space direction="vertical" size={2}>
            <Typography.Text type="secondary" className="sr-only">
              {"Role"}
            </Typography.Text>
            <RoleBadge role={role} />
            <Typography.Title level={3} style={{ margin: 0 }}>
              {roleLabel[role]} Login
            </Typography.Title>
          </Space>
        }
      >
        <Typography.Paragraph style={{ marginBottom: 16 }}>
          {roleIntro[role]}
        </Typography.Paragraph>

        <Form<LoginFormValues>
          form={form}
          layout="vertical"
          requiredMark="optional"
          onFinish={handleFinish}
          initialValues={{ email: "", password: "" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input
              size="large"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password should be at least 6 characters" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Your password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            aria-label={`Sign in as ${roleLabel[role]}`}
          >
            {`Sign in as ${roleLabel[role]}`}
          </Button>

          <Divider />

          <Space direction="vertical" size={4} style={{ width: "100%" }}>
            <Typography.Text type="secondary">
              Having trouble signing in? Contact your administrator.
            </Typography.Text>
          </Space>
        </Form>
      </Card>
    </main>
  );
}
