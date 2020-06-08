/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useMemo } from 'react';
import Select from '@components/Forms/Select';
import TextField from '@components/Forms/TextField';
import classNames from 'classnames';
import Typography from '@components/Typography';
import Button from '@components/Button';
import Alert from '@material-ui/lab/Alert';
import Divider from '@material-ui/core/Divider';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import CheckBox from '@components/Forms/CheckBox';
import useStyles from '../style';
import ItemProduct from './ItemProduct';

const optionsResolution = [
    { label: 'Refund', value: 'refund' },
    { label: 'Replacement', value: 'replacement' },
];

const optionCondition = [
    { label: 'Openend', value: 'open' },
    { label: 'Not Opened', value: 'mot-open' },
    { label: 'Damaged', value: 'damaged' },
];

const Detailreturn = (props) => {
    const { t, detail, currency } = props;
    const styles = useStyles();
    const [dropFile, setDropFile] = React.useState([]);

    const formik = useFormik({
        initialValues: {
            resolution: '',
            condition: '',
            products: [],
            message: '',
            files: [],
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });

    const onDrop = useCallback((param) => {
        const files = dropFile;
        files.push(param[0].name);
        setDropFile(files);
        // Do something with the files
    }, []);
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({ onDrop });


    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        breturnWidth: 2,
        breturnRadius: 2,
        breturnColor: '#eeeeee',
        breturnStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'breturn .24s ease-in-out',
    };

    const activeStyle = {
        breturnColor: '#2196f3',
    };

    const acceptStyle = {
        breturnColor: '#00e676',
    };

    const rejectStyle = {
        breturnColor: '#ff1744',
    };

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
    }), [
        isDragActive,
        isDragReject,
        isDragAccept,
    ]);

    let products = [];

    const handleSelectProduct = (val) => {
        formik.setFieldValue('products', val);
    };

    const selectAll = () => {
        const selected = detail[0].detail[0].items.map(({ sku }) => sku);
        formik.setFieldValue('products', selected);
    };

    const deselectAll = () => formik.setFieldValue('products', []);

    if (detail.length > 0) {
        products = detail[0].detail[0].items.map((product) => ({
            label: product.name,
            value: product.sku,
            ...product,
            t,
            currency,
        }));
        return (
            <div className="column">
                <form onSubmit={formik.handleSubmit}>
                    <div className={classNames(styles.block)}>
                        <Select
                            options={optionsResolution}
                            name="resolution"
                            label={t('return:form:label:resolution')}
                            value={formik.values.resolution}
                            onChange={formik.handleChange}
                        />
                        <Select
                            options={optionCondition}
                            name="condition"
                            label={t('return:form:label:condition')}
                            value={formik.values.condition}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className={styles.labelProduct}>
                        <Typography variant="title">{t('return:product')}</Typography>
                    </div>
                    <div className={styles.selectProductContainer}>
                        <a href="#" onClick={selectAll}>
                            <Typography variant="label">{t('return:selectAll')}</Typography>
                        </a>
                        <Divider orientation="vertical" flexItem />
                        <a href="#" onClick={deselectAll}>
                            <Typography variant="label">{t('return:deselectAll')}</Typography>
                        </a>
                    </div>
                    <div className={styles.block}>
                        {detail.length > 0
                            && detail[0].detail[0].items.length > 0
                            && (
                                <CheckBox
                                    data={products}
                                    label=""
                                    value={formik.values.products}
                                    onChange={handleSelectProduct}
                                    flex="column"
                                    CustomItem={ItemProduct}
                                />
                            )}
                    </div>
                    <div className={styles.block}>
                        <TextField
                            name="message"
                            onChange={formik.handleChange}
                            value={formik.values.message}
                            placeholder={t('return:form:placeholder:message')}
                            label={t('return:form:label:message')}
                            multiline
                            rows={4}
                        />
                    </div>
                    <div className={styles.block}>
                        <div {...getRootProps({ style })}>
                            <input {...getInputProps()} />
                            {
                                isDragActive
                                    ? <p>Drop the files here ...</p>
                                    : <p>Drag drop some files here, or click to select files</p>
                            }
                        </div>
                        <Typography>{t('return:form:placeholder:uploadFile')}</Typography>
                    </div>
                    <div className={styles.block}>
                        {
                            dropFile.map((file, index) => (<Typography key={index}>{file}</Typography>))
                        }
                    </div>
                    <div className={styles.block}>
                        <Button fullWidth>
                            <Typography letter="capitalize" color="white">{t('return:form:submit')}</Typography>
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
    return (
        <Alert className="m-15" severity="warning">
            {t('return:notFound')}
        </Alert>
    );
};

export default Detailreturn;
