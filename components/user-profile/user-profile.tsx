'use client';

import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Layout, Card, Checkbox } from 'antd';
import { Customer } from '@commercetools/platform-sdk';

import getClient from '@/pages/api/get-client';
import PersonalSection from '../registration-form/sections/personal-section';
import { AddressSuffix } from '../registration-form/helpers/registration.types';
import AddressSection from '../registration-form/sections/address-section';
import DividerText from '../registration-form/fields/divider-field';
import setFormData from './helpers/set-form-data';
import { CountryOptionsProps } from '../registration-form/helpers/interface';

const Profile: React.FC<CountryOptionsProps> = ({ countries }) => {
  const [form] = Form.useForm();

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const customer = await getClient();

      setFormData(form, customer as Customer);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <Layout>
      <Layout.Content>
        <Row justify="center" align="middle">
          <Col xs={22} sm={20} md={18} lg={14} xl={12}>
            <Card bordered style={{ borderRadius: 15, marginBlock: 40 }}>
              <Checkbox checked={!componentDisabled} onChange={(e) => setComponentDisabled(!e.target.checked)}>
                Edit
              </Checkbox>
              <Form
                form={form}
                name="user-profile-form"
                initialValues={{
                  remember: true,
                }}
                autoComplete="on"
                layout="vertical"
                disabled={componentDisabled}
              >
                <PersonalSection componentDisabled={componentDisabled} form={form}></PersonalSection>
                <AddressSection
                  countries={countries}
                  form={form}
                  title="Shipping Address"
                  nameSuffix={AddressSuffix.SHIPPING}
                  showCheckbox={true}
                  componentDisabled={componentDisabled}
                />
                <AddressSection
                  countries={countries}
                  form={form}
                  title="Billing Address"
                  nameSuffix={AddressSuffix.BILLING}
                  componentDisabled={componentDisabled}
                />
                <DividerText text={''} />
                <Form.Item style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default Profile;
