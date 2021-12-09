import {
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { pick, entries } from "lodash-es";
import { useEffect, useState } from "react";
import { privateApi } from "../../api/api";
import { createRoleUrl, getRoleUrl } from "../../api/endpoints";
import Layout from "../../components/Layout";

const UpdateRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await privateApi.get(getRoleUrl);
      let { roles } = res.data.result;
      roles = roles.map((role) => ({
        id: role.id,
        name: role.name,
        permissions: [
          role.role_permission.can_create_project === 1,
          role.role_permission.can_edit_project === 1,
          role.role_permission.can_delete_project === 1,
          role.role_permission.can_add_delete_members === 1,
          role.role_permission.can_edit_permissions === 1,
          role.role_permission.can_create_task === 1,
          role.role_permission.can_edit_task === 1,
          role.role_permission.can_delete_task === 1,
          role.role_permission.can_change_task_status === 1,
        ],
      }));
      console.log(roles);
      setRoles(roles);
    };

    fetchData();
  }, []);

  const handleAdd = () => {
    setRoles([
      ...roles,
      {
        name: "",
        permissions: [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ],
      },
    ]);
  };

  console.log(roles);

  const handleCheck = (event, index, roleIndex) => {
    setRoles((roles) => {
      const newRoles = [...roles];
      newRoles[roleIndex].permissions[index] = event.target.checked;

      return newRoles;
    });
  };

  const handleChangeRoleName = (event, roleIndex) => {
    setRoles((roles) => {
      const newRoles = [...roles];
      newRoles[roleIndex].name = event.target.value;

      return newRoles;
    });
  };

  const handleSave = async () => {
    await Promise.all(
      roles.map(async (role) => {
        const roleMap = {
          name: role.name,
          rolePermission: {
            can_create_project: role.permissions[0],
            can_edit_project: role.permissions[1],
            can_delete_project: role.permissions[2],
            can_add_delete_members: role.permissions[3],
            can_edit_permissions: role.permissions[4],
            can_create_task: role.permissions[5],
            can_edit_task: role.permissions[6],
            can_delete_task: role.permissions[7],
            can_change_task_status: role.permissions[8],
          },
        };

        await privateApi.post(createRoleUrl, roleMap);
      })
    );
  };

  return (
    <Layout maxW='90%'>
      <Heading color='white' mb='4rem'>
        Update your roles
      </Heading>
      <Box
        w='100%'
        bgColor='whitesmoke'
        p='14'
        shadow='0px 100px 80px rgba(0, 0, 0, 0.07), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0531481), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0425185), 0px 20px 13px rgba(0, 0, 0, 0.035), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.0274815), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.0168519);'
        borderRadius='10'
      >
        <Box overflowX='auto'>
          <Table>
            <Thead>
              <Tr>
                <Th>Role</Th>
                <Th>can create project</Th>
                <Th>can edit project</Th>
                <Th>can delete project</Th>
                <Th>can update members</Th>
                <Th>can edit permissions</Th>
                <Th>can create task</Th>
                <Th>can edit task</Th>
                <Th>can delete task</Th>
                <Th>can change task status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {roles.map(({ id, name, permissions }, roleIndex) => (
                <Tr key={id}>
                  {name === "owner" ? (
                    <>
                      <Td>{name}</Td>
                      {permissions.map((_, i) => (
                        <Td key={i}>
                          <Checkbox isDisabled checked defaultChecked />
                        </Td>
                      ))}
                    </>
                  ) : (
                    <>
                      <Td>
                        <Input
                          variant='filled'
                          placeholder='Role name'
                          w='100%'
                          isRequired
                          defaultValue={name}
                          onChange={(e) => handleChangeRoleName(e, roleIndex)}
                        />
                      </Td>
                      {permissions.map((permission, i) => (
                        <Td key={i}>
                          <Checkbox
                            defaultChecked={permission}
                            onChange={(e) => handleCheck(e, i, roleIndex)}
                          />
                        </Td>
                      ))}
                    </>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Flex
          mt='2rem'
          w='100%'
          alignItems='center'
          justifyContent='space-between'
        >
          <Button colorScheme='green' onClick={handleAdd}>
            Add Role
          </Button>
          <Button colorScheme='purple' onClick={handleSave}>
            Save changes
          </Button>
        </Flex>
      </Box>
    </Layout>
  );
};

export default UpdateRoles;
