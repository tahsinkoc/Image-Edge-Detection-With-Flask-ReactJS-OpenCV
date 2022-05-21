import React from 'react'
import {
    useState,
    useEffect
} from 'react'
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Container,
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'


function FileUpload() {

    const [file, setFile] = useState();
    const [modal, setModal] = useState(false);
    const [imageViewer, setImageViewer] = useState(false);

    function handleModal() {
        setModal(!modal);
    }

    function handleSubmit(e) {
        e.preventDefault()
        var formData = new FormData();
        console.log(e.target)
        console.log(e.target.file)
        formData.append('file', e.target.file.files[0]);


        fetch('/api/upload', {
            method: 'POST',
            body: formData
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                setFile(data.filename)
                setModal(!modal);
                setImageViewer(!imageViewer);
            })


    }
    function goToGallery() {
        window.location.href = '/images'
    }
    function resShower() {
        if (imageViewer) {
            return (
                <Card>
                    <CardImg top width="100%" src={`/images/${file}`} alt="Card image cap" />
                    <CardBody>
                        <CardText>{file} İsimli Resim Başarıyla Yüklendi</CardText>
                        <Button onClick={goToGallery}>RESİM GALERİSİNE GİT</Button>
                    </CardBody>
                </Card>
            )
        }
        else {
            return (
                <Card style={{ margin: '4em 0' }}>
                    <CardBody>
                        <Button onClick={goToGallery}>RESİM GALERİSİNE GİT</Button>
                    </CardBody>
                </Card>
            )
        }
    }
    return (
        <div>

            <Container className='lg-12'>
                <Modal
                    isOpen={modal}
                    toggle={handleModal}
                >
                    <ModalHeader toggle={handleModal}>
                        Modal title
                    </ModalHeader>
                    <ModalBody>
                        <Card>
                            <CardImg top width="100%" src={`/images/${file}`} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>{file} İsimli Resim Başarıyla Yüklendi</CardTitle>
                                <Button onClick={goToGallery}>RESİM GALERİSİNE GİT</Button>
                            </CardBody>
                        </Card>
                    </ModalBody>
                    <ModalFooter>
                        {' '}
                        <Button onClick={handleModal}>
                            Kapat
                        </Button>
                    </ModalFooter>
                </Modal>

                <Row >
                    <Col className='lg-8'>
                        <h1>RESİM YÜKLEME</h1>
                        <Form className='lg-6' onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label>
                                    Resim Seçiniz
                                </Label>
                                <Input
                                    type="file"
                                    name="file"
                                    id="file"
                                ></Input>
                            </FormGroup>
                            <Button type='submit' className='btn btn-primary'>YÜKLE</Button>
                        </Form>
                    </Col>
                    <Col className='lg-4'>
                        {resShower()}
                    </Col>
                </Row>
            </Container>
            {/* <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="file">Resim Seçiniz</label>
                    <input type="file" name="file" id='file' />
                </div>
                <button type="submit" className='btn btn-primary'>Upload</button>
            </form> */}
        </div>
    )
}

export default FileUpload