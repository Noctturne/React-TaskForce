import React, {Fragment, useContext, useState} from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {
    // - Obtener el state del formulario
    const projectsContext = useContext(projectContext);
    // - Importamos ese formulario de projectState, una vez inscrito en el dom recogemos la función definida
    const { form, errForm, showForm, addProject, showErr } = projectsContext;

    // - Proyecto
    const [project, saveProject] = useState({
        name: ''
    });

    // - Extraer el nombre del proyecto
    const  {name } = project;

    const onChangeProject = e => {
        saveProject({
            ...project,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitProject = e => {
        e.preventDefault();

        // - Validar
        if(name === ''){
            showErr();
            return ;
        }
        // - Agregarlo al state
        addProject(project);
        
        // - Reiniciar Form
        saveProject({
            name: ''
        });
    }

    const onClickForm = () => {
        showForm();
    }

    return(
        <Fragment>
            {
                errForm
                ?
                (
                <div className="alert alert-warning fade show text-center" role="alert">
                    <strong>Oops!</strong> You should check you project name
                </div>
                )
                :
                null
            }
            
            <button type="button" className="btn btn-circle" onClick={onClickForm}><i className="fas fa-plus fa-2x"></i></button>

            {
                form
                ?
                (            
                <form className="new-project-form" onSubmit={onSubmitProject}>
                    <div className="form-field">
                        <input type="text" id="name" name="name" placeholder="Project Name" value={name} onChange={onChangeProject}/>
                    </div>
                    <div className="form-field">
                        <input type="submit" className="btn btn-custom bold"  value="ADD"/>
                    </div>
                </form>
                )
                :
                null
            }
        </Fragment>
        
    );
}

export default NewProject;