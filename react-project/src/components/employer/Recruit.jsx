import { Button, Form, Modal } from "react-bootstrap";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ErrorPage from "../ErrorPage";
import Api, { endpoints } from "../../api/Api";
const Recruit = () => {
  const [state, setState] = useState([]);

  const [company, setCompany] = useState("");
  const [jobName, setJobName] = useState("");
  const [salary, setSalary] = useState("");
  // const [address, setAddress] = useState("");
  const [jobCate, setJobCate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const user = useSelector((state) => state.user.user);
  // let jobImage = useRef();
  // const [temp, setTemp] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const data = await axios.get(
        "http://tranlehuynh.pythonanywhere.com/categories/"
      );
      setState(data.data);
    };

    const loadAddress = async () => {
      const data = await Api.get(endpoints["createCompany"]);
      const res = data.data.filter((s) => s.user === user.id);
      console.log(res);
      setCompany(res);

      console.log(data);

      console.log(data.data);
    };
    loadData();
    loadAddress();
  }, [user.id]);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  let path = <ErrorPage />;

  // let formData = new FormData()
  //   formData.append("job_name", jobName);
  //     formData.append("job_category", jobCate);
  //     formData.append("company", company[0].id);
  //     formData.append("salary", salary);
  //     formData.append("category_id", selectedValue);
  //     formData.append("description", description);
  //     formData.append("image")

  const createJob = async (e) => {
    e.preventDefault();
    const res = await Api.post(endpoints["createJob"], {
      job_name: jobName,
      job_category: jobCate,
      company: company[0].id,
      salary: salary,
      category_id: selectedValue,
      description: description,
    });
    console.log(res.data);
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  if (user !== null && user !== undefined) {
    if (user.role === 2) {
      path = (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>Th??ng b??o</Modal.Header>
            <Modal.Body>????ng tin th??nh c??ng</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
          <Header />
          <Form
            className="col-md-5 m-auto rounded border p-3 mt-3"
            onSubmit={createJob}
          >
            <Form.Group
              className="mb-3 mt-3"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
            >
              <Form.Label>T??n c??ng vi???c</Form.Label>
              <Form.Control placeholder="Nh???p t??n c??ng vi???c" />
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>M???c l????ng</Form.Label>
              <Form.Control
                placeholder="Nh???p m???c l????ng"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ng??nh</Form.Label>
              <Form.Select
                onChange={handleChange}
                value={selectedValue}
                required
              >
                <option value="">Ch???n ng??nh...</option>;
                {state.map((s) => {
                  return (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ng??nh</Form.Label>
              <Form.Select
                onChange={(e) => setJobCate(e.target.value)}
                required
              >
                <option value="">Ch???n ng??nh...</option>;
                <option value="1">Fulltime</option>;
                <option value="2">Parttime</option>;
              </Form.Select>
            </Form.Group>
            {/* <Form.Group className="mb-3 mt-3">
              <Form.Label>?????a ??i???m</Form.Label>
              <Form.Select onChange={(e) => setAddress(e.target.value)}>
                <option value="">Ch???n ?????a ??i???m</option>
                {company.map((s) => {
                  return (
                    <option key={s.id} value={s.name}>
                      {s.address}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group> */}
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Ghi ch??</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nh???p th??ng tin v??? vi???c l??m, c??ng ty, ph??c l???i..."
              />
            </Form.Group>
            {/* <label htmlFor="login-avatar-1">Avatar</label>
            <input
              type="file"
              ref={jobImage}
              onChange={(e) => setTemp(e.target.value)}
              id="login-avatar-1"
              name="login-avatar-1"
            /> */}
            <div className="text-center">
              <Button variant="primary" type="submit" onClick={handleShow}>
                ????ng tin
              </Button>
            </div>
          </Form>
        </>
      );
    }
  }
  return <>{path}</>;
};

export default Recruit;
