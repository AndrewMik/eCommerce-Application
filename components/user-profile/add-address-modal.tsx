import { Button, Form, Modal } from 'antd';
import { Customer } from '@commercetools/platform-sdk';
import { FormDataAddNewAddress } from '@/components/registration-form/helpers/registration.types';
import AddressProfileSection from './address-profile-section';

type Props = {
  handleCancel: () => void;
  addNewAddress: (formData: FormDataAddNewAddress) => Promise<void>;
  countries: string[];
  updateCustomer: (customer: Customer) => void;
};

// eslint-disable-next-line import/prefer-default-export
export const AddAddressModal = ({ handleCancel, addNewAddress, countries, updateCustomer }: Props) => {
  const [formModal] = Form.useForm();

  return (
    <Modal
      title="Add Address"
      onCancel={handleCancel}
      open={true}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" form="address-form" htmlType="submit">
          Save
        </Button>,
      ]}
    >
      <Form id="address-form" form={formModal} autoComplete="on" layout="vertical" onFinish={addNewAddress}>
        <Form.Item>
          <AddressProfileSection
            form={formModal}
            isModal={true}
            countries={countries}
            nameSuffix={'newAddress'}
            componentDisabled={false}
            isShipping={false}
            isBilling={false}
            isDefaultShipping={false}
            isDefaultBilling={false}
            updateCustomerData={updateCustomer}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
