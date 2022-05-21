import React from 'react'
import {
    useState,
    useEffect
} from 'react'
import {
    Col,
    Row,
    Container,
    Card,
    CardImg,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText

} from 'reactstrap';
function Images() {
    const [images, setImages] = useState([]);
    const [sobel, setSobel] = useState([]);
    const [laplacian, setLaplacian] = useState([]);

    function handleThey(el) {
        setImages(el.images)
        setSobel(el.sobel)
        setLaplacian(el.laplacian)
    }

    useEffect(() => {
        fetch('/api/images')
            .then(res => res.json())
            .then(data =>
                handleThey(data)
            );
    }, []);

    return (
        <div>
            <Container className='xs-12'>

                <h2 className='mt-5'>RESİMLERİN ORJİNAL HALİ</h2>
                <Row >
                    {
                        images.map(image => (
                            <Col
                                className='xs-12 sm-6 md-4 lg-4' style={{ margin: '2em auto' }}>
                                <Card style={{
                                    width: '25em'
                                }}>
                                    < CardImg top src={`/images/${image}`
                                    } alt="Card image cap" style={{ height: '270px' }} />
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                <hr />
                <Row>
                    <h2>OPEN CV SOBEL İLE DÜZENLENMİŞ RESİMLER</h2>
                    {
                        sobel.map(image => (
                            <Col style={{ margin: '2em auto' }}
                                className='xs-12 sm-6 md-4 lg-4'>
                                <Card style={{ width: '25em' }}>
                                    <CardImg top src={`/Sobel/${image}`} alt="Card image cap" style={{ height: '270px' }} />
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                <hr />
                <Row>
                    <h2>OPEN CV LAPLACIAN İLE DÜZENLENMİŞ RESİMLER</h2>
                    {
                        laplacian.map(image => (
                            <Col style={{ margin: '2em auto' }}
                                className='xs-12 sm-6 md-4 lg-4'>
                                <Card style={{ width: '25em' }}>
                                    <CardImg top src={`/Laplacian/${image}`} alt="Card image cap" style={{ height: '270px' }} />
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </div >
    )
}
export default Images